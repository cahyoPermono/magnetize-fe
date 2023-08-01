<template>
  <div class="text-center" style="width: 75vw">
    <Toast />
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
      <Card v-for="comment in COMMENTS" :key="comment.id" class="mb-3 bg-cyan-100">
        <template #content>
          <div class="flex justify-content-between pl-2">
            <div class="text-left">
              <span class="text-xs text-color-secondary">
                <b>{{ comment.user.fullName }}</b> commented on this applicant :
              </span>
              <p class="text-basic">{{ comment.comment }}</p>
            </div>
            <div class="text-right">
              <div class="text-xs text-color-secondary pr-2">
                {{ formatted_date(comment.createdAt) }}
              </div>
              <LazyPopupMenu @destroy="destroy(comment.id)" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
/**************************************************************************
 * IMPORT
 ***************************************************************************/
//PROJECT
import axios from "axios";
import { usePermission } from "~~/stores/permission";
import { useToast } from "primevue/usetoast";

/**************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const toast = useToast();
const store = usePermission();
const config = useRuntimeConfig();
const route = useRoute();

const COMMENTS = ref([]);

/**************************************************************************
 * FUNCTIONS
 ***************************************************************************/
//API
const submitComment = async (val, { resetForm }) => {
  const res = await axios.post(
    config.API_BASE_URL + "applicant_comment",
    {
      comment: val.new_comment,
      ApplicantId: route.params.id,
    },
    {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }
  );
  toast.add({ severity: "success", summary: "add new comment, success", life: 3000 });
  resetForm();
  await getComment();
};

const getComment = async () => {
  const res = await axios.get(config.API_BASE_URL + "applicant_comment/" + route.params.id, {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });
  COMMENTS.value = res.data.data;
};

const destroy = async (commentId) => {
  const res = await axios.delete(config.API_BASE_URL + "applicant_comment/" + commentId, {
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });
  toast.add({ severity: "success", summary: "delete comment, success", life: 3000 });
  res.data ? await getComment() : false;
};

onMounted(async () => {
  await getComment();
});

//Helper
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
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
</script>
