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
          >
            >
            <option disabled value="">
              Sélectionner une ville ou une région
            </option>
            <option
              v-for="(item, index) in city"
              :key="index"
              :value="item.name"
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
        <span>{{ selected }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      selected: "",
      city: [
        { id: "0", name: "Yaoundé" },
        { id: "1", name: "Douala" },
        { id: "2", name: "Maroua" },
        { id: "3", name: "Garoua" },
        { id: "4", name: "Ngaoundere" },
        { id: "5", name: "Baffoussam" },
        { id: "6", name: "Buea" },
        { id: "7", name: "Bamenda" },
        { id: "8", name: "Bertoua" },
        { id: "9", name: "Ebolowa" },
      ],
    };
  },
  methods: {
    selectOption: function () {
      if (this.city.id == "1") {
        console.log("Hello", this.city.id, this.selected);
        return (this.selected = "Yaounde");
      }
    },
  },
  async created() {
    const data = await axios
      .post("https://alert.eneo.cm", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => response);
    console.log("DATA", data);
  },
};
</script>