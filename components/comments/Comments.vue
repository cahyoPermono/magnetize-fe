<template>
  <div class="text-center" style="width: 75vw">
    <div class="text-center p-3" v-if="!COMMENTS">
      <p class="text-color-secondary">Belum Ada Komentar</p>
      <i class="pi pi-comments" style="font-size: 5rem; color: rgba(0, 0, 0, 0.3)"></i>
    </div>
    <div class="px-3" v-else>
      <Form @submit="submitComment">
        <div class="flex mb-4">
          <Field v-slot="{ field, errorMessage }" name="new_comment" :rules="isRequired">
            <InputText
              v-bind="field"
              :class="{ 'p-invalid': errorMessage }"
              class="block w-full mr-2"
              placeholder="Leave a Comment"
            />
            <small id="email-help" class="p-error block">{{ errorMessage }}</small>
          </Field>
          <Button icon="pi pi-send" type="submit" role="submit" text></Button>
        </div>
      </Form>
      <Card v-for="(comment, index) in COMMENTS" :key="index" class="mb-3 bg-cyan-100">
        <template #content>
          <div class="flex justify-content-between pl-2">
            <div class="text-left">
              <span class="text-xs text-color-secondary">
                <b>{{ comment.user }}</b> commented on this applicant :
              </span>
              <p class="text-basic">{{ comment.comment }}</p>
            </div>
            <div class="text-right">
              <div class="text-xs text-color-secondary pr-2">
                {{ formatted_date(comment.createdAt) }}
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
const COMMENTS = [
  { user: "Admin", comment: "Bisa Lanjut ke tahapan selanjutnya", createdAt: new Date() },
  { user: "Admin", comment: "Bisa melakukan Psycotest", createdAt: new Date() },
  { user: "Admin", comment: "Harus Interview User Ulang", createdAt: new Date() },
];

const submitComment = (val) => {
  console.log(val);
};

const formatted_date = (current_datetime) => {
  const date = new Date(current_datetime);
  return (
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
