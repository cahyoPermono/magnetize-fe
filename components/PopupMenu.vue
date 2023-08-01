<template>
  <div>
    <button class="plain mt-3">
      <small @click="toggle"><i class="pi pi-ellipsis-v"></i></small>
    </button>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script setup>
const emits = defineEmits(["destroy"]);

const menu = ref();
const items = ref([
  {
    label: "Action",
    items: [
      {
        label: "Delete",
        icon: "pi pi-times",
        command: () => {
          emits("destroy");
        },
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style>
.plain {
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}
</style>
