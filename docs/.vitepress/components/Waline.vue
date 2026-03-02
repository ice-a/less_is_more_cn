<template>
    <WalineComment v-bind="commentConfig" :path="path" />
</template>
<script setup>
import { Waline as WalineComment } from '@waline/client/component';
import { computed, onMounted } from 'vue';
import { useRoute, useData } from 'vitepress';
import '@waline/client/style'; // 使用正确的CSS导入路径

const route = useRoute();
const { frontmatter, site } = useData();

// 从VitePress配置中获取评论配置
const commentConfig = computed(() => {
    // 获取config.mjs中配置的评论参数
    const config = site.value.themeConfig?.comment || {};

    // 如果是Waline提供者，返回所有Waline相关配置
    if (config.provider === 'waline') {
        // 创建一个不包含provider字段的配置对象
        const { provider, ...walineConfig } = config;
        return walineConfig;
    }

    return {};
});

// 使用VitePress的useRoute钩子获取路径，兼容SSR
const path = computed(() => {
    // 服务器端使用route.path，客户端使用window.location.pathname
    return typeof window !== 'undefined' ? window.location.pathname : route.path;
});
</script>