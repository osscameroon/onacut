<template>
  <div
    class="
      site__result
      shadow-2xl
      p-5
      flex flex-col
      items-center
      justify-center
      h-240
    "
  >
    <h4>{{ city }}</h4>
    <p>{{ region }}</p>
  </div>
</template>

<script>
export default {
  name: "Cards",
  props: {
    city: String,
    region: String,
    hour: String,
  },
};
</script>