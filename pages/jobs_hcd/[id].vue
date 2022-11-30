<template>
    <h1>ID : {{ id }}</h1>
    <NuxtLink to="/jobs_hcd" class="float my-float">
      <Button icon="pi pi-arrow-left" class="p-button-rounded" style="box-shadow: 2px 2px 3px #999" />
    </NuxtLink>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const id = route.params.id;
</script>