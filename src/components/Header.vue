<template>
  <header
    style="font-family: 'Rubik', sans-serif; border-bottom-width: 1px"
    class="site__header bg-gray-100 py-2"
  >
    <div
      class="
        container
        mx-auto
        flex flex-col
        md:flex-row
        md:justify-between
        items-center
      "
    >
      <div class="site__header-title flex items-center">
        <img :src="myLogo" alt="" class="site__header-img w-6 h-6 mr-2" />
        <h1
          class="text-2xl font-extrabold text-green-800"
          style="font-family: 'Source Sans Pro', sans-serif"
        >
          {{ title }}
        </h1>
      </div>
      <div class="site__header-socials pt-4 md:pt-0">
        <div class="site__header-icons flex items-center justify-center">
          <ul v-for="share in shares">
            <a class="ml-3" :href="share.link">
              <i
                :class="`${share.icon} text-green-800 hover:text-gray-600`"
                aria-hidden="true"
              ></i>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      shares: [
        { id: "0", link: "https://instagram.com", icon: "fa fa-github" },
        { id: "1", link: "https://twitter.com", icon: "fa fa-telegram" },
        { id: "2", link: "https://facebook.com", icon: "fa fa-twitter" },
      ],
    };
  },
  props: {
    title: String,
    myLogo: String,
  },
};
</script>