<template>
  <div>
    <Card>
      <template #title> Technical Skills </template>
      <template #content>
        <Form @submit="submit">
          <Card>
            <template #title>
              Keterangan Lainnya<span
                ><small><i> (Other Informations)</i></small></span
              >
            </template>
            <template #content>
              <div class="mt-2 mx-3">
                <label for="contact_emergency">
                  <small
                    >Sebutkan orang terdekat yang bisa dihubungi dalam keadaan darurat ?
                  </small>
                  <span style="color: red">*</span>
                </label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="contact_emergency"
                  :rules="isRequired"
                  v-model="otherinformation.contact_emergency"
                  class="block"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="contact_emergency_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="mr-2"
                  />
                  <small id="contact_emergency_help" class="p-error block">{{
                    errorMessage
                  }}</small>
                </Field>
              </div>
              <div class="mt-2 mx-3">
                <label for="contact_emergency">
                  <small
                    >Nomor telpon orang terdekat yang bisa dihubungi dalam keadaan darurat
                  </small>
                  <span style="color: red">*</span>
                </label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="person_contact_emergency"
                  :rules="personContact"
                  v-model="otherinformation.person_contact_emergency"
                  class="block"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="person_contact_emergency_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block"
                  />
                  <small id="person_contact_emergency_help" class="p-error block">{{
                    errorMessage
                  }}</small>
                </Field>
              </div>
            </template>
          </Card>
          <!-- <button type="submit">submit</button> -->
          <Button class="p-button-sm" icon="pi pi-arrow-left" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" style="float: right" type="submit" />
        </Form>
        <!-- {{ skills }} -->
      </template>
    </Card>
  </div>
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const otherinformation = ref({
  contact_emergency: "",
  person_contact_emergency: "",
});

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

const personContact = (values) => {
  if (otherinformation.value.contact_emergency) {
    if (!values) {
      return "This field is required";
    }
    return true;
  }
  return true;
};

const submit = (values) => {
  console.log(values);
};

onMounted(async () => {});

definePageMeta({
  layout: false,
});
</script>
