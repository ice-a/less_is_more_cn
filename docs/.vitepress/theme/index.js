import DefaultTheme from 'vitepress/theme'
import Hitokoto from '../components/Hitokoto.vue'
import Navigation from '../components/Navigation.vue'
import AdCarousel from '../components/AdCarousel.vue'
import SponsorInfo from '../components/SponsorInfo.vue'
import layout from './Layout.vue'
import 'viewerjs/dist/viewer.min.css'
import imageViewer from 'vitepress-plugin-image-viewer'
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'
import { useRoute } from 'vitepress'

export default {
    extends: DefaultTheme,
    Layout: layout,
    enhanceApp({ app }) {
        app.component('Hitokoto', Hitokoto)
        app.component('Navigation', Navigation)
        app.component('AdCarousel', AdCarousel)
        app.component('SponsorInfo', SponsorInfo)
        app.component('vImageViewer', vImageViewer)
        // app.component('Waline', Waline)
    },
    setup() {
        const route = useRoute()
        imageViewer(route)
    },
    // Layout: Waline
}