<template>
  <div>
    <TabView ref="tabview1">
      <TabPanel>
        <template #header>
          <i class="pi pi-book"></i>
          <span>Notes</span>
        </template>
        <div>
          <tambah-note />
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-copy"></i>
          <span>Attchments</span>
        </template>
        <div>
          <tambah-attachment />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
</script>
