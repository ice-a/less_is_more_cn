<template>
  <div class="nav-page">
    <div class="nav-header">
      <h1>资源导航</h1>
      <input
        v-model="query"
        class="search"
        type="text"
        placeholder="搜索名称或描述"
        aria-label="搜索"
      />
    </div>

    <div v-if="filteredGroups.length === 0" class="empty">未找到匹配项</div>

    <section v-for="group in filteredGroups" :key="group.name" class="group">
      <h2 class="group-title">{{ group.name }} <span class="count">{{ group.items.length }}</span></h2>
      <div class="items">
        <a
          v-for="item in group.items"
          :key="item.name + item.url"
          class="card"
          :href="normalizeUrl(item.url)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="card-title">{{ item.name }}</div>
          <div class="card-desc">{{ item.desc }}</div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import rawItems from '../data/1.json'

// 规范化数据，容错缺失字段，剔除无效项
const items = computed(() => {
  return (Array.isArray(rawItems) ? rawItems : [])
    .filter(i => i && (i.name || i.url))
    .map(i => ({
      name: String(i.name || '').trim() || '(未命名)',
      url: String(i.url || '').trim() || '#',
      catelog: String(i.catelog || '未分类').trim(),
      desc: String(i.desc || '').trim()
    }))
})

// 分组并排序
const groups = computed(() => {
  const map = new Map()
  for (const it of items.value) {
    const key = it.catelog || '未分类'
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(it)
  }
  const result = Array.from(map.entries()).map(([name, arr]) => ({
    name,
    items: arr
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'))
  }))
  // 类别按中文/英文排序
  result.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'))
  return result
})

// 查询过滤
const query = ref('')
const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return groups.value
  return groups.value
    .map(g => ({
      name: g.name,
      items: g.items.filter(it =>
        (it.name && it.name.toLowerCase().includes(q)) ||
        (it.desc && it.desc.toLowerCase().includes(q)) ||
        (it.url && it.url.toLowerCase().includes(q))
      )
    }))
    .filter(g => g.items.length > 0)
})

// 规范化 URL，处理占位符 '#'
function normalizeUrl(url) {
  const u = (url || '').trim()
  if (!u || u === '#') return 'javascript:void(0)'
  return u
}
</script>

<style scoped>
.nav-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search {
  flex: 1;
  max-width: 420px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.group-title {
  font-size: 1.2rem;
  font-weight: 600;
}
.group-title .count {
  margin-left: 0.5rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.card {
  display: block;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
}
.card:hover {
  border-color: var(--vp-c-brand);
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}
.card-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.empty {
  color: var(--vp-c-text-2);
}
</style>