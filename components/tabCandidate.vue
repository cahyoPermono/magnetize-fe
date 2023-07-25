<template>
  <Card>
    <template #content>
      <TabView ref="tabview1">
        <TabPanel>
          <template #header>
            <i class="pi pi-bars"></i>
            <span>&nbsp;&nbsp;Summary</span>
          </template>
          <div>
            <SummaryCandidate></SummaryCandidate>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-file"></i>
            <span>&nbsp;&nbsp;Personal Documents</span>
          </template>
          <div>
            <LazyResume />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-comments"></i>
            <span>&nbsp;&nbsp;Comments</span>
          </template>
          <div>
            <LazyComments />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-briefcase"></i>
            <span>&nbsp;&nbsp;Jobs</span>
          </template>
          <div>
            <LazyJobs />
          </div>
        </TabPanel>
      </TabView>
    </template>
  </Card>
</template>

<script setup></script>
