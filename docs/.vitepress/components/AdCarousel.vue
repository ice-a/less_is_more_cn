<template>
  <div class="ad-carousel">
    <div class="carousel-container" :style="carouselStyle">
      <div v-for="(item, index) in ads" :key="index" class="carousel-item">
        <div v-if="item.type === 'image'" class="ad-image-container">
          <a :href="item.href || '#'" target="_blank">
            <img :src="item.content" :alt="item.alt || 'Advertisement'" class="ad-image">
          </a>
        </div>
        <div v-else-if="item.type === 'text'" class="ad-text">
          <p><a :href="item.href || '#'" target="_blank">{{ item.content }}</a></p>
          <button v-if="item.buttonText" class="ad-button"><a :href="item.href || '#'" target="_blank">{{ item.buttonText }}</a></button>
        </div>
        <div v-else-if="item.type === 'html'" class="ad-html" v-html="item.content"></div>
      </div>
    </div>
    <div class="carousel-indicators">
      <span 
        v-for="(item, index) in ads" 
        :key="index" 
        class="indicator"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
    <button class="carousel-control prev" @click="prevSlide">&lt;</button>
    <button class="carousel-control next" @click="nextSlide">&gt;</button>
  </div>
</template>

<script>
export default {
  name: 'AdCarousel',
  props: {
    // 广告数据数组
    ads: {
      type: Array,
      default: () => [
        {
          type: 'image',
          content: 'https://t.alcy.cc/pc',
          alt: '广告图片1',
          href: 'https://www.baidu.com'
        },
        {
          type: 'text',
          content: '广告位招租！',
          buttonText: '立即查看',
          href: 'https://www.baidu.com'
        },
        {
          type: 'image',
          content: 'https://random-api.czl.net/pic/truegirl',
          alt: '广告图片2',
          href: 'https://www.baidu.com'
        }
      ]
    },
    // 轮播间隔时间（毫秒）
    interval: {
      type: Number,
      default: 5000
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    // 轮播高度
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  computed: {
    carouselStyle() {
      return {
        height: this.height,
        transform: `translateX(-${this.currentIndex * 100}%)`
      }
    }
  },
  mounted() {
    if (this.autoplay) {
      this.startAutoplay()
    }
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    startAutoplay() {
      this.timer = setInterval(() => {
        this.nextSlide()
      }, this.interval)
    },
    stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.ads.length
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.ads.length) % this.ads.length
    },
    goToSlide(index) {
      this.currentIndex = index
      // 重置自动播放计时器
      if (this.autoplay) {
        this.stopAutoplay()
        this.startAutoplay()
      }
    }
  }
}
</script>

<style scoped>
.ad-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.carousel-item {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.ad-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ad-text {
  text-align: center;
  padding: 20px;
  color: #333;
}

.ad-text p {
  font-size: 18px;
  margin-bottom: 15px;
}

.ad-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.ad-button:hover {
  background-color: #0056b3;
}

.ad-html {
  width: 100%;
  height: 100%;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: rgba(255, 255, 255, 0.9);
  width: 24px;
  border-radius: 6px;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  z-index: 10;
}

.carousel-control:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ad-carousel {
    margin: 10px 0;
  }
  
  .carousel-control {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
  
  .indicator.active {
    width: 20px;
  }
}
</style>