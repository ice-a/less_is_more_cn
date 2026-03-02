<script setup>
import DefaultTheme from 'vitepress/theme'
import Waline from '../components/Waline.vue' // 导入你的评论组件
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData() // 获取 frontmatter 数据
</script>

<template>
    <Layout>
        <template #doc-after>
            <!-- 可以根据 frontmatter 控制是否显示评论 -->
            <Waline v-if="frontmatter.comment !== false" />
        </template>
    </Layout>
</template>
