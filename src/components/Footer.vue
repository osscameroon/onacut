<template>
  <footer
    style="font-family: 'Rubik', sans-serif; border-top-width: 1px"
    class="site__footer bg-gray-100 py-2"
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
      <div class="site__footer-title flex items-center">
        <img :src="myLogo" alt="" class="site__header-img w-6 h-6 mr-2" />
        <h1
          class="text-sm font-extrabold text-green-800"
          style="font-family: 'Source Sans Pro', sans-serif"
        >
          {{ title }}
        </h1>
      </div>
      <div class="site__footer-socials pt-4 md:pt-0">
        <div class="site__footer-icons flex items-center justify-center">
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
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      shares: [
        {
          id: "0",
          link: "https://github.com/osscameroon/",
          icon: "fa fa-github",
        },
      ],
    };
  },
  props: {
    title: String,
    myLogo: String,
  },
};
</script>