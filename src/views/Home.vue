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
      <Search @zoneChanged="onZoneChanged" />

      <div v-if='outages.length == 0'> 
        <div v-if='selectedZone == null'>
          <div class="text-center">
            Veuillez choisir une zone.
          </div>
        </div>
        <div v-else>
          <div class="text-center">
            Aucun délestage prévu dans la zone que vous avez sélectionnée.
          </div>
        </div>
      </div>

      <div v-else>
        <div v-for='outage in outages' :key='outage.id'>
          <div>
            {{ outage.quarter }}
          </div>
          <div>
            Le {{ outage.date }} de {{ outage.start }} à {{ outage.end }}
          </div>
          <div>
            Description : {{ outage.description }}
          </div>
        </div>
      </div>


    </main>
    <Footer :title="footerTitle" :myLogo="myLogo" />
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Footer from "../components/Footer.vue";
var axios = require('axios');
var FormData = require('form-data');

export default {
  data() {
    return {
      outages: [],
      selectedZone: null,
      isRequesting: false,
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
  beforeMount() {
  },
  methods: {
    onZoneChanged(value) {
      this.selectedZone = value;
      this.loadDatas(value)
    },
    loadDatas(code) {
      this.isRequesting = true;
      var data = new FormData();
      data.append('region', code);

      var config = {
        method: 'post',
        url: 'https://alert.eneo.cm/ajaxOutage.php',
        headers: { 
          'Cookie': 'PHPSESSID=e0a06f16b4839b9ec4d87d7fc14e7f50; _ga=GA1.2.152048199.1635952363; _gid=GA1.2.551582278.1635952363', 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        const result = JSON.stringify(response.data)
        result.data.forEach((d,i) => {
          this.outages.push({
            id: i,
            zone: d.quartier,
            start: d.prog_heure_debut,
            end: d.prog_heure_fin,
            description: d.observations,
            date: d.prog_date
          })
        })
        this.isRequesting = false;
      })
      .catch(function (error) {
        console.log(error);
      });

    },
  }
};
</script>