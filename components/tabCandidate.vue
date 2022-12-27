<template>
    <div class="card">
      <TabView ref="tabview1">
        <TabPanel>
          <template #header>
            <i class="pi pi-bars"></i>
            <span>&nbsp;&nbsp;Summary</span>
          </template>
          <div>
            <SummaryCandidate ></SummaryCandidate>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-file"></i>
            <span>&nbsp;&nbsp;Resume</span>
          </template>
          <div>
            <Resume/>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-briefcase"></i>
            <span>&nbsp;&nbsp;Jobs</span>
          </template>
          <div>
            <Jobs />
          </div>
        </TabPanel>
      </TabView>
    </div>
  </template>
  
  <script setup>
  </script>
  