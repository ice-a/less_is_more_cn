<template>
  <div class="hitokoto-container" @click="fetchHitokoto">
    <div class="hitokoto-content">
      <p class="hitokoto-text">{{ hitokoto }}</p>
      <p class="hitokoto-from" v-if="from">—— {{ from }}</p>
    </div>
    <div class="hitokoto-refresh">
      <span class="refresh-icon">↻</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const hitokoto = ref('加载中...')
const from = ref('')

const fetchHitokoto = async () => {
  hitokoto.value = '加载中...'
  from.value = ''
  try {
    const response = await fetch('https://v1.hitokoto.cn/')
    const data = await response.json()
    hitokoto.value = data.hitokoto
    from.value = data.from || ''
  } catch {
    hitokoto.value = '生活就像海洋，只有意志坚强的人才能到达彼岸'
    from.value = '马克思'
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>

<style scoped>
.hitokoto-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.25s ease;
  border-left: 3px solid var(--vp-c-brand);
}

.hitokoto-container:hover {
  background: var(--vp-c-bg-elv);
  transform: translateX(2px);
}

.hitokoto-content {
  flex: 1;
  min-width: 0;
}

.hitokoto-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin: 0;
}

.hitokoto-from {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0 0;
  text-align: right;
}

.hitokoto-refresh {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-default-soft);
  transition: background 0.25s;
}

.hitokoto-container:hover .hitokoto-refresh {
  background: var(--vp-c-brand);
  color: white;
}

.refresh-icon {
  font-size: 1rem;
}
</style>
