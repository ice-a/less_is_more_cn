<template>
  <div class="nav-page">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="query"
          class="search-input"
          type="text"
          placeholder="搜索网站名称、描述或分类..."
          aria-label="搜索"
        />
        <span v-if="query" class="clear-btn" @click="query = ''">✕</span>
      </div>
      <div class="search-stats">
        共 <strong>{{ totalItems }}</strong> 个站点，<strong>{{ filteredGroups.length }}</strong> 个分类
      </div>
    </div>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <button
        class="tab"
        :class="{ active: activeCategory === '' }"
        @click="activeCategory = ''"
      >
        全部
      </button>
      <button
        v-for="cat in categories"
        :key="cat.name"
        class="tab"
        :class="{ active: activeCategory === cat.name }"
        @click="activeCategory = cat.name"
      >
        {{ cat.name }} <span class="tab-count">{{ cat.count }}</span>
      </button>
    </div>

    <!-- 空状态 -->
    <div v-if="displayGroups.length === 0" class="empty">
      <span class="empty-icon">📭</span>
      <p>没有找到匹配的站点</p>
    </div>

    <!-- 分组展示 -->
    <section v-for="group in displayGroups" :key="group.name" class="group">
      <h2 class="group-title">
        <span class="group-icon">{{ getCategoryIcon(group.name) }}</span>
        {{ group.name }}
        <span class="group-count">{{ group.items.length }}</span>
      </h2>
      <div class="items">
        <a
          v-for="item in group.items"
          :key="item.name + item.url"
          class="card"
          :href="normalizeUrl(item.url)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="card-header">
            <div class="card-favicon">
              <img
                :src="getFavicon(item.url)"
                :alt="item.name"
                loading="lazy"
                @error="onFaviconError"
              />
            </div>
            <div class="card-info">
              <div class="card-title">{{ item.name }}</div>
              <div class="card-url">{{ getDomain(item.url) }}</div>
            </div>
          </div>
          <div v-if="item.desc" class="card-desc">{{ item.desc }}</div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import rawItems from '../data/1.json'

// 数据处理
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

const totalItems = computed(() => items.value.length)

// 分类列表
const categories = computed(() => {
  const map = new Map()
  for (const it of items.value) {
    const key = it.catelog || '未分类'
    map.set(key, (map.get(key) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

// 分组
const groups = computed(() => {
  const map = new Map()
  for (const it of items.value) {
    const key = it.catelog || '未分类'
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(it)
  }
  return Array.from(map.entries()).map(([name, arr]) => ({
    name,
    items: arr.slice().sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'))
  }))
})

// 查询与过滤
const query = ref('')
const activeCategory = ref('')

const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  let result = groups.value

  // 按分类过滤
  if (activeCategory.value) {
    result = result.filter(g => g.name === activeCategory.value)
  }

  // 按关键词过滤
  if (q) {
    result = result
      .map(g => ({
        name: g.name,
        items: g.items.filter(it =>
          it.name.toLowerCase().includes(q) ||
          it.desc.toLowerCase().includes(q) ||
          it.url.toLowerCase().includes(q)
        )
      }))
      .filter(g => g.items.length > 0)
  }

  return result
})

const displayGroups = computed(() => filteredGroups.value)

// 工具函数
function normalizeUrl(url) {
  const u = (url || '').trim()
  if (!u || u === '#') return 'javascript:void(0)'
  return u
}

function getDomain(url) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function getFavicon(url) {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return ''
  }
}

function onFaviconError(e) {
  e.target.style.display = 'none'
}

function getCategoryIcon(name) {
  const icons = {
    'AFF': '💰',
    'AI': '🤖',
    'AI绘画': '🎨',
    'AI对话': '💬',
    'AI工具': '🛠️',
    'APP工具': '📱',
    'APP分享': '📲',
    'Github项目': '⭐',
    'Hook工具': '🔗',
    'Python库': '🐍',
    'RPC框架': '🔌',
    '办公工具': '💼',
    '加密平台': '🔐',
    '学习教程': '📚',
    '学习社区': '🏫',
    '小火箭反代': '🚀',
    '工具分享': '🔧',
    '开发工具': '⚙️',
    '开源项目': '🌐',
    '影视': '🎬',
    '搜索引擎': '🔎',
    '效率工具': '⚡',
    '数据提取': '📊',
    '文档资料': '📄',
    '漏洞平台': '🛡️',
    '网盘分享': '☁️',
    '自学平台': '🎓',
    '薅羊毛': '🐑',
    '资源': '📦',
    '资源识别': '🔍',
    '轨迹生成': '📍',
    '逆向教程': '🔓',
    '风控对抗': '🏰',
    '验证码平台': '✅',
    '黑产情报': '🕵️',
  }
  return icons[name] || '📌'
}
</script>

<style scoped>
.nav-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: border-color 0.2s;
}

.search-wrapper:focus-within {
  border-color: var(--vp-c-brand);
}

.search-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  outline: none;
  color: var(--vp-c-text-1);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.clear-btn {
  cursor: pointer;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.search-stats {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  padding-left: 0.25rem;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.tab-count {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* 分组 */
.group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.group-icon {
  font-size: 1.2rem;
}

.group-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
  background: var(--vp-c-default-soft);
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
}

/* 卡片网格 */
.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.75rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  text-decoration: none;
  transition: all 0.2s;
}

.card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.card-favicon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-default-soft);
}

.card-favicon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-url {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 空状态 */
.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-3);
}

.empty-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .items {
    grid-template-columns: 1fr;
  }

  .category-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.75rem;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
