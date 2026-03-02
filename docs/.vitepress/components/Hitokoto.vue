<template>
  <div class="hitokoto-container">
    <div class="hitokoto-content">
      <p class="hitokoto-text">{{ hitokoto }}</p>
      <p class="hitokoto-from">—— {{ from }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const hitokoto = ref('正在加载一言...')
    const from = ref('')

    const fetchHitokoto = async () => {
      try {
        const response = await fetch('https://v1.hitokoto.cn/')
        const data = await response.json()
        hitokoto.value = data.hitokoto
        from.value = data.from || '未知'
      } catch (error) {
        hitokoto.value = '生活就像海洋，只有意志坚强的人才能到达彼岸'
        from.value = '马克思'
      }
    }

    onMounted(() => {
      fetchHitokoto()
    })

    return {
      hitokoto,
      from
    }
  }
}
</script>

<style scoped>
.hitokoto-container {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand);
  transition: all 0.3s ease;
}

.hitokoto-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hitokoto-content {
  font-family: var(--vp-font-family-base);
}

.hitokoto-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-style: italic;
}

.hitokoto-from {
  text-align: right;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.dark .hitokoto-container {
  background-color: var(--vp-c-bg-soft-dark);
  border-left-color: var(--vp-c-brand-dark);
}
</style>