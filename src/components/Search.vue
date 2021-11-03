<template>
  <div class="site__search bg-green-800 h-56 my-4">
    <div
      class="container mx-auto h-full flex justify-center items-center flex-col"
    >
      <div
        class="
          site__search-card
          h-3/4
          w-11/12
          md:w-3/4
          bg-white
          shadow-2xl
          flex flex-col
          items-center
          rounded-md
          justify-center
        "
      >
        <div class="w-11/12">
          <select
            style="
              font-family: 'Source Sans Pro', sans-serif;
              border-width: 1px;
            "
            class="px-2 py-1 w-full"
            name="regions"
            id=""
            v-model="selected"
            @change='onChange($event)'
          >
            >
            <option disabled value="">
              Sélectionner une ville ou une région
            </option>
            <option
              v-for="(item, index) in city"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <div class="site__search-items mt-4 md:flex-row flex-col flex w-full">
            <div class="blogOne w-full md:w-9/12">
              <input
                type="text"
                style="
                  font-family: 'Source Sans Pro', sans-serif;
                  border-width: 1px;
                "
                class="w-full md:w-11/12 pl-2 py-1"
                placeholder="Saisir un nom de quartier pour une recherche rapide"
              />
            </div>
            <div
              style="font-family: 'Source Sans Pro', sans-serif"
              class="
                blogTwo
                bg-green-800
                mt-2
                md:mt-0
                py-1
                w-full
                md:w-3/12
                flex
                justify-center
                items-center
                rounded-md
                cursor-pointer
              "
            >
              <p class="font-bold uppercase text-white">rechercher</p>
            </div>
          </div>
        </div>
        <span>{{ zoneName }}</span>
      </div>
    </div>
  </div>
</template>

<script>

var axios = require('axios');

export default {
  name: "Search",
  data() {
    return {
      selected: "",
      city: [
        { id: 'X-1', name: "Yaoundé" },
        { id: 'X-22', name: "Douala" }
      ],
    };
  },
  methods: {
    loadDatas() {
      var data = new FormData();
      data.append('region', 'X-22');

      var config = {
        method: 'post',
        url: 'https://alert.eneo.cm/ajaxOutage.php',
        headers: { 
          'Cookie': 'PHPSESSID=e0a06f16b4839b9ec4d87d7fc14e7f50; _ga=GA1.2.152048199.1635952363; _gid=GA1.2.551582278.1635952363; _gat_gtag_UA_145904416_1=1', 
          ...data.getHeaders()
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    onChange(event) {
      this.$emit('zoneChanged', event.target.value)
    },
    selectOption: function () {
      alert("Hello")
      if (this.city.id == "1") {
        console.log("Hello", this.city.id, this.selected);
        return (this.selected = "Yaounde");
      }
    },
  },
  computed: {
    zoneName: function() {
      const result = this.city.filter((i) => i.id == this.selected)
      return (result.length > 0) ? result[0].name : null 
    }
  }
};
</script>