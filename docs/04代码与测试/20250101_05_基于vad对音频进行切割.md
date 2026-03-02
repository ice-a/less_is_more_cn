# why?

通过ai生成的音频上传到X音音乐，上传片段超过60s

# So

基于vad停顿切分音频，分段上传

```python
"""
pip install pydub
pip install numpy
pip install librosa
pip install soundfile
"""
from pydub import AudioSegment
from pydub.silence import split_on_silence
import numpy as np


def dynamic_audio_split(file_path, output_dir="output", max_length=50, min_length=5):
    """Intelligent audio segmentation with adaptive parameters"""
    # Audio loading and initialization
    audio = AudioSegment.from_file(file_path)
    segments = []

    # Adaptive parameter settings
    base_params = {
        'silence_thresh': -40,
        'min_silence': 600,
        'keep_silence': 200,
        'step_size': 50
    }

    # Phase 1: Primary segmentation
    raw_chunks = split_on_silence(
        audio,
        silence_thresh=base_params['silence_thresh'],
        min_silence_len=base_params['min_silence'],
        keep_silence=base_params['keep_silence'],
        seek_step=base_params['step_size']
    )

    # Phase 2: Dynamic processing
    buffer = raw_chunks[0]
    for chunk in raw_chunks[1:]:
        projected_length = (len(buffer) + len(chunk)) / 1000

        # Adaptive parameter adjustment
        current_params = dynamic_param_tuning(buffer, base_params)

        if projected_length > max_length:
            split_point = find_optimal_split(buffer, max_length)
            if split_point:
                segments.append(buffer[:split_point])
                buffer = buffer[split_point:] + chunk
            else:
                segments.extend(force_split(buffer, max_length))
                buffer = chunk
        elif projected_length < min_length:
            buffer += chunk
        else:
            segments.append(buffer)
            buffer = chunk

    # Final processing
    if len(buffer) >= min_length * 1000:
        if len(buffer) > max_length * 1000:
            segments.extend(force_split(buffer, max_length))
        else:
            segments.append(buffer)

    # Validation and export
    validate_and_export(segments, output_dir, min_length, max_length)
    return segments


def dynamic_param_tuning(buffer, base_params):
    """Adjust parameters based on buffer characteristics"""
    params = base_params.copy()
    buffer_duration = len(buffer) / 1000

    # Adjust sensitivity based on buffer length
    if buffer_duration > 30:
        params['silence_thresh'] += 5  # Increase sensitivity
        params['min_silence'] = max(300, params['min_silence'] - 100)
    elif buffer_duration < 10:
        params['silence_thresh'] -= 3  # Decrease sensitivity
        params['min_silence'] += 150

    return params


def find_optimal_split(chunk, max_length):
    """Find the best split point near target length"""
    target_point = max_length * 1000
    waveform = np.array(chunk.get_array_of_samples())

    # Search ±2 seconds around target length
    for offset in range(-2000, 2000, 100):
        current_pos = min(target_point + offset, len(chunk))
        if current_pos < 5000 or current_pos > (max_length * 1000):
            continue

        # Check for silent window
        if is_silent_zone(waveform, current_pos, chunk.frame_rate):
            return int(current_pos)
    return None


def is_silent_zone(waveform, position, sr, window=500):
    """Detect silence around specified position"""
    start = max(0, int(position - window))
    end = min(len(waveform), int(position + window))
    segment = waveform[start:end]
    rms = np.sqrt(np.mean(segment ** 2))
    return rms < (0.02 * np.max(np.abs(waveform)))


def force_split(chunk, max_length):
    """Split long chunks at regular intervals"""
    max_samples = max_length * 1000
    return [chunk[i:i + max_samples] for i in range(0, len(chunk), max_samples)]


def validate_and_export(segments, output_dir, min_len, max_len):
    """Quality check and file export"""
    for idx, seg in enumerate(segments):
        duration = len(seg) / 1000
        if duration < min_len or duration > max_len:
            raise ValueError(f"Segment {idx} invalid: {duration}s")
        seg.export(f"{output_dir}/segmentes_{idx + 1}.wav", format="wav")


dynamic_audio_split("1.wav", max_length=50, min_length=5)
```