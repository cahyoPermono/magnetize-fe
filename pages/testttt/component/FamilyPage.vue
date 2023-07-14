<template>
  <Card>
    <template #title>
      Data Keluarga&nbsp;<span><small>(Family Data)</small></span>
    </template>
    <template #content>
      <Form v-slot="{ meta }">
        <div class="mt-2 mx-3">
          <div class="grid">
            <label for="marital_status" class="col-2">
              <small>Status Perkawinan</small><span style="color: red">*</span>
            </label>
            <div class="col">
              <Field
                type="radio"
                name="marital_status"
                value="lajang"
                :rules="isRequired"
                v-model="store.applicant.marital_status"
              />&nbsp;
              <label for="marital_status" class="col-form-label"><small>Lajang</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="marital_status"
                value="janda/duda"
                :rules="isRequired"
                v-model="store.applicant.marital_status"
              />&nbsp;
              <label for="marital_status" class="col-form-label"><small>Janda/Duda</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="marital_status"
                value="menikah"
                :rules="isRequired"
                v-model="store.applicant.marital_status"
              />&nbsp;
              <label for="marital_status" class="col-form-label"><small>Menikah</small></label>
              <ErrorMessage name="marital_status">
                <small style="color: red">Marital Status is required</small>
              </ErrorMessage>
            </div>
          </div>
          <div class="grid mt-2">
            <label for="year_marriage" class="col-2">
              <small>Tahun Perkawinan</small>
            </label>
            <div class="col">
              <Field name="year_marriage" v-if="store.applicant.marital_status !== 'menikah'">
                <InputText class="p-inputtext-sm w-full" name="year_marriage" disabled />
              </Field>
              <Field
                v-else
                v-slot="{ field, errorMessage }"
                name="year_marriage"
                :rules="isRequired"
                v-model="store.applicant.year_marriage"
              >
                <InputText
                  class="p-inputtext-sm w-full"
                  name="year_marriage"
                  v-bind="field"
                  v-model="store.applicant.year_marriage"
                />
                <small id="year-marriage-help" class="p-error block">{{ errorMessage }}</small>
              </Field>
            </div>
          </div>
          <div class="flex justify-content-between">
            <Button class="p-button-sm" icon="pi pi-arrow-left" @click="$emit('back')" />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="$emit('next')"
              :disabled="!(meta.valid && meta.dirty)"
            />
          </div>
        </div>
      </Form>
    </template>
  </Card>
</template>

<script setup>
/**************************************************************************
 * IMPORT
 ***************************************************************************/
//PROJECT
import { useStore } from "~~/stores/StoreApplicant";

/**************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();

//Main Data
const emits = defineEmits(["next", "back"]);

/**************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
