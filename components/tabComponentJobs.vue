<template>
    <div class="card">
      <TabView ref="tabview1">
        <TabPanel>
          <template #header>
            <i class="pi pi-users"></i>
            <span>  - Candidates</span>
          </template>
          <div>
            <Candidates />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-align-left"></i>
            <span>  - Summary</span>
          </template>
          <div>
            <Summary ></Summary>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-sitemap"></i>
            <span>  - Team</span>
          </template>
          <div>
            <tambah-attachment />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-info-circle"></i>
            <span>  - Recommendations</span>
          </template>
          <div>
            <tambah-attachment />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar"></i>
            <span>  - Activities</span>
          </template>
          <div>
            <tambah-attachment />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-plus-circle"></i>
            <span>  - Sourcing</span>
          </template>
          <div>
            <tambah-attachment />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-chart-bar"></i>
            <span>  - Reports</span>
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
  