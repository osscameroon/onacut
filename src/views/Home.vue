<template>
  <div class="site h-screen">
    <Header :title="headerTitle" :myLogo="myLogo" />
    <main style="height: 80vh">
      <a href="#" class="my-4 md:my-8 flex items-center justify-center">
        <img class="h-10 w-52 bg-cover" :src="donate" />
      </a>
      <h4
        style="font-family: 'Yaldevi', sans-serif"
        class="text-center text-xl font-normal"
      >
        {{ description }}
      </h4>
      <Search />
    </main>
    <Footer :title="footerTitle" :myLogo="myLogo" />
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      headerTitle: "Onacutapps237",
      footerTitle: "© 2021 OSS Cameroon, All rights reserved.",
      description: "program of works & cuts by district",
      info: null,
      myLogo: require("../assets/imgs/scissors.png"),
      donate: require("../assets/imgs/donate.png"),
    };
  },
  name: "Home",
  components: {
    Header,
    Search,
    Footer,
  },
  async created() {
    const data = await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => (this.info = response.data));
    console.log("aaaaaa", data);
  },
};
</script>