<template>
  <Card>
    <template #title>
      Keterangan Lainnya
      <span>
        <small><i> (Other Informations)</i></small>
      </span>
    </template>
    <template #content>
      <Form v-slot="{ meta }">
        <div class="form-page">
          <div class="mt-2 mx-3">
            <label for="hospitalized">
              <small
                >Apakah anda pernah dirawat di rumah sakit dan atau menderita sakit yang lama ?
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown
                v-model="store.otherInformation.hospitalized"
                :options="hospitalized"
                optionLabel="val"
                optionValue="val"
                class="w-full"
              />
            </div>
          </div>
          <div class="mt-2 mx-3" v-if="store.otherInformation.hospitalized === 'ya'">
            <label for="disease">
              <small>(Jika Ya) Sakit apa ? </small>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="disease"
              :rules="isRequired"
              v-model="store.otherInformation.disease"
            >
              <InputText
                v-bind="field"
                aria-describedby="email-help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="email-help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3" v-if="store.otherInformation.hospitalized === 'ya'">
            <label for="year">
              <small>Kapan ? </small>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="name"
              :rules="isRequired"
              v-model="store.otherInformation.year"
            >
              <InputText
                v-bind="field"
                aria-describedby="email-help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="email-help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="reason_hire">
              <small>Mengapa kami bisa mempekerjakan anda? </small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="reason_hire"
              :rules="isRequired"
              v-model="store.otherInformation.reason_hire"
            >
              <InputText
                v-bind="field"
                aria-describedby="reason_hire_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="reason_hire_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="plan">
              <small>Sebutkan rencana jangka pendek dan rencana jangka panjang anda?</small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="plan"
              :rules="isRequired"
              v-model="store.otherInformation.plan"
            >
              <InputText
                v-bind="field"
                aria-describedby="plan-help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="plan-help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="psycological_test">
              <small>Kapan terakhir anda mengikuti evaluasi psikologis (psikotest) ?</small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="psycological_test"
              :rules="isRequired"
              v-model="store.otherInformation.psycological_test"
            >
              <InputText
                v-bind="field"
                aria-describedby="psycological_test_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="psycological_test_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="opinion_teamwork">
              <small>Informasikan pendapat anda tentang Kerjasama (Team Work) ?</small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="opinion_teamwork"
              :rules="isRequired"
              v-model="store.otherInformation.opinion_teamwork"
            >
              <InputText
                v-bind="field"
                aria-describedby="opinion_teamwork_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="opinion_teamwork_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="respond_target">
              <small
                >Bagaimana tanggapan anda mengenai target yang akan diberikan oleh perusahaan kepada
                anda?
              </small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="respond_target"
              :rules="isRequired"
              v-model="store.otherInformation.respond_target"
            >
              <InputText
                v-bind="field"
                aria-describedby="respond_target_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="respond_target_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="respond_preasure">
              <small>Bagaimana tanggapan anda mengenai tekanan dalam pekerjaan? </small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="respond_preasure"
              :rules="isRequired"
              v-model="store.otherInformation.respond_preasure"
            >
              <InputText
                v-bind="field"
                aria-describedby="respond_preasure_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="respond_preasure_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="salary_expect">
              <small>Berapa gaji yang anda inginkan ? </small>
              <span style="color: red">*</span>
            </label>
            <InputNumber
              mode="currency"
              currency="IDR"
              locale="id-ID"
              v-model="store.otherInformation.salary_expect"
              name="salary_expect"
              class="w-full"
              :minFractionDigits="0"
            />
          </div>
          <div class="mt-2 mx-3">
            <label for="able_to_start">
              <small>Kapan anda dapat mulai bekerja ? </small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="able_to_start"
              :rules="isRequired"
              v-model="store.otherInformation.able_to_start"
            >
              <InputText
                v-bind="field"
                aria-describedby="able_to_start_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="able_to_start_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="person_contact_emergency">
              <small>Sebutkan orang terdekat yang bisa dihubungi dalam keadaan darurat ? </small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="person_contact_emergency"
              :rules="isRequired"
              v-model="store.otherInformation.person_contact_emergency"
            >
              <InputText
                v-bind="field"
                aria-describedby="person_contact_emergency_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="person_contact_emergency_help" class="p-error block">{{
                errorMessage
              }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="contact_emergency">
              <small>Nomor telpon orang terdekat yang bisa dihubungi dalam keadaan darurat </small>
              <span style="color: red">*</span>
            </label>
            <Field
              v-slot="{ field, errorMessage }"
              name="contact_emergency"
              :rules="isRequired"
              v-model="store.otherInformation.contact_emergency"
            >
              <InputText
                v-bind="field"
                aria-describedby="contact_emergency_help"
                :class="{ 'p-invalid': errorMessage }"
                class="block w-full"
              />
              <small id="contact_emergency_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="relatives_in_ip">
              <small
                >Sebutkan nama kenalan anda di PT. Imani Prima dan hubungan anda dengannya
                sebagai?</small
              >
            </label>
            <Field
              v-slot="{ field }"
              name="relatives_in_ip"
              v-model="store.otherInformation.relatives_in_ip"
            >
              <InputText v-bind="field" aria-describedby="relatives_in_ip" class="block w-full" />
            </Field>
          </div>
          <div class="mt-2 mx-3" v-if="store.otherInformation.relatives_in_ip">
            <label for="position_relatives_in_ip">
              <small>Sebutkan posisi kenalan anda di PT. Imani Prima</small>
            </label>
            <Field
              v-slot="{ field }"
              name="position_relatives_in_ip"
              v-model="store.otherInformation.position_relatives_in_ip"
              :rules="isRequired"
            >
              <InputText
                v-bind="field"
                aria-describedby="position_relatives_in_ip"
                class="block w-full"
              />
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="strength">
              <small>Menurut anda apa kelebihan pada diri anda ? Sebutkan 3. </small>
              <span style="color: red">*</span>
            </label>
            <div class="grid">
              <div class="col flex">
                <label for="strength-1" class="pt-2 mr-1">1.</label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="strength-1"
                  :rules="isRequired"
                  v-model="store.otherInformation.strength[0]"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="strength_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="strength_help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col flex">
                <label for="strength-2" class="pt-2 mr-1">2.</label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="strength-2"
                  :rules="isRequired"
                  v-model="store.otherInformation.strength[1]"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="strength_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="strength_help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col flex">
                <label for="strength-3" class="pt-2 mr-1">3.</label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="strength-3"
                  :rules="isRequired"
                  v-model="store.otherInformation.strength[2]"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="strength_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="strength_help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="weakness">
              <small>Menurut anda apa kekurangan pada diri anda ? Sebutkan 3. </small>
              <span style="color: red">*</span>
            </label>
            <div class="grid">
              <div class="col flex">
                <label for="weakness-1" class="pt-2 mr-1">1.</label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="weakness-1"
                  :rules="isRequired"
                  v-model="store.otherInformation.weakness[0]"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="weakness_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="weakness_help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col flex">
                <label for="weakness-2" class="pt-2 mr-1">2.</label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="weakness-2"
                  :rules="isRequired"
                  v-model="store.otherInformation.weakness[1]"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="weakness_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="weakness_help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col flex">
                <label for="weakness-3" class="pt-2 mr-1">3.</label>
                <Field
                  v-slot="{ field, errorMessage }"
                  name="weakness-3"
                  :rules="isRequired"
                  v-model="store.otherInformation.weakness[2]"
                >
                  <InputText
                    v-bind="field"
                    aria-describedby="weakness_help"
                    :class="{ 'p-invalid': errorMessage }"
                    class="block w-full"
                  />
                  <small id="weakness_help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="part_time_job">
              <small>Apakah anda memiliki pekerjaan part time ? </small>
              <span style="color: red">*</span>
            </label>
            <Dropdown
              v-model="store.otherInformation.part_time_job"
              :options="hospitalized"
              optionLabel="val"
              class="w-full"
              optionValue="val"
            />
          </div>
          <div class="mt-2 mx-3" v-if="store.otherInformation.part_time_job === 'ya'">
            <label for="about_part_time_job">
              <small>(Jika Ya) dimana dan sebagai apa ? </small>
            </label>
            <Field
              v-slot="{ field }"
              name="about_part_time_job"
              :rules="isRequired"
              v-model="store.otherInformation.about_part_time_job"
            >
              <InputText v-bind="field" class="block w-full" />
            </Field>
          </div>
        </div>
        <div class="flex justify-content-between mt-4">
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="$emit('back')" />
          <Button
            class="p-button-sm"
            icon="pi pi-arrow-right"
            @click="$emit('next')"
            :disabled="!(meta.valid && meta.dirty)"
          />
        </div>
      </Form>
    </template>
  </Card>
</template>

<script setup>
/***************************************************************************
 * IMPORT
 ***************************************************************************/
//PROJECT
import { useStore } from "~~/stores/StoreApplicant";

/***************************************************************************
 * DATA
 ***************************************************************************/
//Constant Data
const store = useStore();

//Main Data
const emits = defineEmits(["next", "back"]);

/***************************************************************************
 * CONSTANT FUNCTION
 ***************************************************************************/
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

const hospitalized = [{ val: "ya" }, { val: "tidak" }];
</script>
