<template>
  <div class="bg-pattern2 px-4 py-3 min-h-screen">
    <div>
      <Toast />
    </div>
    <Card class="mb-3 flex justify-content-center">
      <template #content>
        <img class="head-form" src="~/assets/formapplication/Header.jpg" alt="header">
      </template>
    </Card>
    <Form v-slot="{ meta }" @submit="save">
      <Card v-if="apply">
        <template #content>
          <div class="mt-2 mx-3">
            <div class="grid">
              <div class="col-10 text-left pl-2">
                <h3 class="text-2xl mb-0">FORMULIR LAMARAN KERJA</h3>
                <p class="text-lg my-0">Application Form</p>
              </div>
              <div class="col-2">
                <div>
                  <Avatar :image="applicant.photo" size="xlarge" style="width: 120px; height: 120px" />
                </div>
                <div>
                  <label for="image">Foto</label>
                  <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="2000000" @upload="onUploadAva"
                    :auto="true" chooseLabel="Browse" />
                </div>
              </div>
            </div>
            <div class="grid" style="margin-top: 35px">
              <label for="position" class="col-2">
                <small>Posisi yang dilamar</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field name="position" v-model="applicant.JobId">
                  <Dropdown class="w-full" v-model="applicant.JobId" :options="jobs" optionLabel="name" />
                </Field>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-text" :disabled="true" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(apply = false), (personal1 = true)"
            style="float: right" :disabled="!(applicant.JobId && applicant.photo)" />
        </template>
      </Card>
      <Card v-if="personal1">
        <template #title>
          Data Pribadi<span><small>(Personal Data)</small></span>
        </template>
        <template #content>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="name" class="col-2">
                <small>Nama Lengkap</small><span style="color: red">*</span>
              </label>
              <div class="col-10">
                <Field v-slot="{ field, errorMessage }" name="name" :rules="isRequired" v-model="applicant.name">
                  <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                    class="block w-full" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="gender" class="col-2">
                <small>Gender</small><span style="color: red">*</span>
              </label>
              <div class="col-10">
                <Field type="radio" name="applicant_gender" value="L" :rules="isRequired" v-model="applicant.gender" />
                &nbsp;&nbsp;
                <label for="applicant_gender"
                  class="col-form-label"><small>Laki-Laki</small></label>&nbsp;&nbsp;&nbsp;&nbsp;
                <Field type="radio" name="applicant_gender" value="P" :rules="isRequired" v-model="applicant.gender" />
                &nbsp;&nbsp;
                <label for="applicant_gender" class="col-form-label"><small>Perempuan</small></label>
                <ErrorMessage name="applicant_gender">
                  <small style="color: red">Gender is required</small>
                </ErrorMessage>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="place_of_birth" class="col-2">
                <small>Tempat/Tanggal Lahir</small><span style="color: red">*</span>
              </label>
              <div class="col-4">
                <Field v-slot="{ field, errorMessage }" name="place_of_birth" :rules="isRequired"
                  v-model="applicant.place_of_birth">
                  <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                    class="block w-full" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col-6">
                <Field v-slot="{ field, errorMessage }" name="date" :rules="isRequired" v-model="applicant.date">
                  <InputText type="date" v-bind="field" aria-describedby="email-help"
                    :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <div class="col-2">
                <label for="address">
                  <small>Alamat Rumah (sesuai KTP)</small><span style="color: red">*</span>
                </label>
              </div>
              <div class="col-2">
                <Field :rules="isRequired" name="province" v-model="applicant.province">
                  <Dropdown class="w-full" v-model="applicant.province" :options="dataProvinsi" optionLabel="nama"
                    @change="getKota(applicant.province.id, 'ktp')" />
                </Field>
              </div>
              <div class="col-2">
                <Field :rules="isRequired" name="city" v-model="applicant.city">
                  <Dropdown class="w-full" v-model="applicant.city" :options="dataKotaKab" optionLabel="nama"
                    @change="getKecamatan(applicant.city.id, 'ktp')" />
                </Field>
              </div>
              <div class="col-2">
                <Field :rules="isRequired" name="district" v-model="applicant.district">
                  <Dropdown class="w-full" v-model="applicant.district" :options="dataKecamatan" optionLabel="nama"
                    @change="getDesaKel(applicant.district.id, 'ktp')" />
                </Field>
              </div>
              <div class="col-2">
                <Field :rules="isRequired" name="subdistrict" v-model="applicant.subdistrict">
                  <Dropdown class="w-full" v-model="applicant.subdistrict" :options="dataDesaKel" optionLabel="nama" />
                </Field>
              </div>
              <div class="col-2">
                <Field v-slot="{ field, errorMessage }" name="postal_code_address" :rules="isRequired"
                  v-model="applicant.postal_code_address">
                  <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                    class="block w-full" placeholder="Kode Pos" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
            <div class="grid">
              <div class="col-10 col-offset-2">
                <Field v-slot="{ field, errorMessage }" name="address" :rules="isRequired" v-model="applicant.address">
                  <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                    class="block w-full" placeholder="Alamat Lengkap" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <div class="col-2">
                <label for="address">
                  <small>Alamat Rumah (Domisili)</small>
                </label>
              </div>
              <div class="col-2">
                <Field name="province_dom" v-model="applicant.province_dom">
                  <Dropdown class="w-full" v-model="applicant.province_dom" :options="dataProvinsi" optionLabel="nama"
                    @change="getKota(applicant.province_dom.id, 'domicile')" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col-2">
                <Field name="city_dom" v-model="applicant.city_dom">
                  <Dropdown class="w-full" v-model="applicant.city_dom" :options="dataKotaKab_dom" optionLabel="nama"
                    @change="getKecamatan(applicant.city_dom.id, 'domicile')" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
              <div class="col-2">
                <Field name="district_dom" v-model="applicant.district_dom">
                  <Dropdown class="w-full" v-model="applicant.district_dom" :options="dataKecamatan_dom"
                    optionLabel="nama" @change="getDesaKel(applicant.district_dom.id, 'domicile')" />
                </Field>
              </div>
              <div class="col-2">
                <Field name="subdistrict_dom" v-model="applicant.subdistrict_dom">
                  <Dropdown class="w-full" v-model="applicant.subdistrict_dom" :options="dataDesaKel_dom"
                    optionLabel="nama" />
                </Field>
              </div>
              <div class="col-2">
                <Field v-slot="{ field }" name="postal_code_domicile" v-model="applicant.postal_code_domicile">
                  <InputText v-bind="field" aria-describedby="email-help" class="block w-full" placeholder="Kode Pos" />
                </Field>
              </div>
            </div>
            <div class="grid">
              <div class="col-10 col-offset-2">
                <Field v-slot="{ field }" name="domicile" v-model="applicant.domicile">
                  <InputText v-bind="field" aria-describedby="email-help" class="block w-full"
                    placeholder="Alamat Lengkap" />
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="office_parent_phone" class="col-2">
                <small>No HP Orang Tua</small>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" name="office_parent_phone"
                  v-model="applicant.office_parent_phone">
                  <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                    class="block w-full" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="blood_type" class="col-2">
                <small>Gol Darah</small>
              </label>
              <div class="col">
                <Field type="radio" name="blood_type" value="A" v-model="applicant.blood_type" />
                <label for="blood_type" class="mr-3 ml-1"><small>A</small></label>
                <Field type="radio" name="blood_type" value="B" v-model="applicant.blood_type" />
                <label for="blood_type" class="mr-3 ml-1"><small>B</small></label>
                <Field type="radio" name="blood_type" value="AB" v-model="applicant.blood_type" />
                <label for="blood_type" class="mr-3 ml-1"><small>AB</small></label>
                <Field type="radio" name="blood_type" value="O" v-model="applicant.blood_type" />
                <label for="blood_type" class="mr-3 ml-1"><small>O</small></label>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="mobile" class="col-2">
                <small>Handphone</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="mobile" v-model="applicant.mobile">
                  <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                    class="block w-full" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="email" class="col-2">
                <small>Email</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="email" v-model="applicant.email">
                  <InputText v-bind="field" aria-describedby="email-help" :disabled="true" />
                  <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                </Field>
              </div>
            </div>
          </div>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="religion" class="col-2">
                <small>Agama</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field type="radio" name="religion" value="islam" :rules="isRequired" v-model="applicant.religion" />
                <label for="religion" class="mr-3 ml-1"><small>Islam</small></label>
                <Field type="radio" name="religion" value="katholik" :rules="isRequired" v-model="applicant.religion" />
                <label for="religion" class="mr-3 ml-1"><small>Katholik</small></label>
                <Field type="radio" name="religion" value="protestan" :rules="isRequired" v-model="applicant.religion" />
                <label for="religion" class="mr-3 ml-1"><small>Protestan</small></label>
                <Field type="radio" name="religion" value="budha" :rules="isRequired" v-model="applicant.religion" />
                <label for="religion" class="mr-3 ml-1"><small>Budha</small></label>
                <Field type="radio" name="religion" value="hindu" :rules="isRequired" v-model="applicant.religion" />
                <label for="religion" class="mr-3 ml-1"><small>Hindu</small></label>
                <Field type="radio" name="religion" value="lainnya" :rules="isRequired" v-model="applicant.religion" />
                <label for="religion" class="mr-3 ml-1"><small>Lainnya</small></label>
                <ErrorMessage name="religion">
                  <small style="color: red">Religion is required</small>
                </ErrorMessage>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <!-- {{ meta }} -->
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(personal1 = false), (apply = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(personal1 = false), (family = true)"
            :disabled="!meta.valid" style="float: right" />
        </template>
      </Card>
      <Card v-if="family">
        <template #title>
          Data Keluarga&nbsp;<span><small>(Family Data)</small></span>
        </template>
        <template #content>
          <div class="mt-2 mx-3">
            <div class="grid">
              <label for="marital_status" class="col-2">
                <small>Status Perkawinan</small><span style="color: red">*</span>
              </label>
              <div class="col">
                <Field type="radio" name="marital_status" value="lajang" :rules="isRequired"
                  v-model="applicant.marital_status" />&nbsp;
                <label for="marital_status"
                  class="col-form-label"><small>Lajang</small></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Field type="radio" name="marital_status" value="janda/duda" :rules="isRequired"
                  v-model="applicant.marital_status" />&nbsp;
                <label for="marital_status"
                  class="col-form-label"><small>Janda/Duda</small></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Field type="radio" name="marital_status" value="menikah" :rules="isRequired"
                  v-model="applicant.marital_status" />&nbsp;
                <label for="marital_status" class="col-form-label"><small>Menikah, Tahun</small></label>&nbsp;&nbsp;
                <InputText v-if="
                  applicant.marital_status === 'lajang' ||
                  applicant.marital_status === 'janda/duda'
                " class="p-inputtext-sm" name="year_marriage" type="text" v-model="applicant.year_marriage" readonly />
                <InputText v-else class="p-inputtext-sm" name="year_marriage" type="text"
                  v-model="applicant.year_marriage" />
                <ErrorMessage name="marital_status">
                  <small style="color: red">Marital Status is required</small>
                </ErrorMessage>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(family = false), (personal1 = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(family = false), (formaleducation = true)"
            :disabled="!(meta.valid && meta.dirty)" style="float: right" />
        </template>
      </Card>
      <Card v-if="formaleducation">
        <template #title>
          Pendidikan Formal<span><small> (Formal Education)</small></span>
        </template>
        <template #content>
          <Button label="Tambah Data Pendidikan Formal" @click="openModal" />
          <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '80vw' }" :modal="true">
            <div>
              <div class="mt-2">
                <div class="grid">
                  <label for="level" class="col-2">
                    <small>Level</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field name="level" v-model="formaleducate.level">
                      <Dropdown class="w-full" v-model="formaleducate.level" :options="levels" optionValue="code"
                        optionLabel="level_name" placeholder="Select a Level" />
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="name_location" class="col-2">
                    <small>Sekolah / Perguruan Tinggi</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="name_location"
                      v-model="formaleducate.name_location">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="location" class="col-2">
                    <small>Lokasi</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="location"
                      v-model="formaleducate.location">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="major" class="col-2">
                    <small>Jurusan</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="major"
                      v-model="formaleducate.major">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="entry" class="col-2">
                    <small>Tahun Masuk</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="entry"
                      v-model="formaleducate.entry">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" type="month"
                        class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="graduate" class="col-2">
                    <small>Tahun Lulus</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="graduate"
                      v-model="formaleducate.graduate">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" type="month"
                        class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="ip_rata" class="col-2">
                    <small>IPK / Nilai Rata-Rata</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="ip_rata"
                      v-model="formaleducate.ip_rata">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" @click="openModal" class="p-button-text" />
              <Button label="Yes" icon="pi pi-check" @click="addFormalEducation()"
                :disabled="!(meta.valid && meta.dirty)" />
            </template>
          </Dialog>
          <div class="flex justify-content-center">
            <div class="grid w-full mt-4">
              <div class="col-4" v-for="(data, index) in formaleducations" :key="index">
                <Card class="shadow-3">
                  <template #header>
                    <div class="flex px-3 pt-1">
                      <p class="text-lg">
                        {{ data.level }}
                      </p>
                      <p class="cursor-pointer ml-3">
                        <i @click="cancelEdu(index, formaleducations)" class="pi pi-trash text-xs">
                        </i>
                      </p>
                    </div>
                  </template>
                  <template #content>
                    <div class="text-sm">
                      <table border="0">
                        <td>
                          <tr>sekolah/universitas</tr>
                          <tr>Lokasi</tr>
                          <tr>Jurusan</tr>
                          <tr>Tahun Masuk</tr>
                          <tr>Tahun Lulus</tr>
                          <tr>IPK/Nilai Rata-Rata</tr>
                        </td>
                        <td>
                          <tr> : {{ data.name_location }}</tr>
                          <tr> : {{ data.location }}</tr>
                          <tr> : {{ data.major }}</tr>
                          <tr> : {{ data.entry }}</tr>
                          <tr> : {{ data.graduate }}</tr>
                          <tr> : {{ data.ip_rata }}</tr>
                        </td>
                      </table>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(formaleducation = false), (family = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right"
            @click="(formaleducation = false), (nonformaleducation = true)" :disabled="formaleducations.length < 1"
            style="float: right" />
        </template>
      </Card>
      <Card v-if="nonformaleducation">
        <template #title>
          Pendidikan Non Formal<span><small> <i>(Non Formal Education)</i></small></span>
        </template>
        <template #content>
          <Button @click="openDialogNonformal" icon="pi pi-plus" label="Tambah Pendidikan Nonformal" />
          <Dialog header="Pendidikan Non-Formal" v-model:visible="displayModalNonformal"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '80vw' }" :modal="true">
            <div>
              <div class="mt-2">
                <div class="grid">
                  <label for="course" class="col-2">
                    <small>Nama Kursus / Training / Workshop</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="course"
                      v-model="nonformaleducate.course">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="year" class="col-2">
                    <small>Tahun</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="year"
                      v-model="nonformaleducate.year">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="duration" class="col-2">
                    <small>Durasi</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="duration"
                      v-model="nonformaleducate.duration">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="sponsored_by" class="col-2">
                    <small>Di Biayai Oleh</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="sponsored_by"
                      v-model="nonformaleducate.sponsored_by">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" @click="openDialogNonformal" class="p-button-text" />
              <Button label="Yes" icon="pi pi-check" @click="addnonFormal()" :disabled="!(meta.valid && meta.dirty)" />
            </template>
          </Dialog>
          <div class="flex justify-content-center">
            <div class="grid w-full">
              <div class="col-4" v-for="(data, index) in nonformaleducations" :key="index">
                <Card>
                  <template #header>
                    <div class="flex px-3 pt-1">
                      <p class="text-lg">
                        {{ data.course }}
                      </p>
                      <p class="cursor-pointer ml-3">
                        <i @click="cancelEdu(index, nonformaleducations)" class="pi pi-trash text-xs">
                        </i>
                      </p>
                    </div>
                  </template>
                  <template #content>
                    <div class="text-sm">
                      <table border="0">
                        <td class="max-w-3rem">
                          <tr>Tahun</tr>
                          <tr>Durasi</tr>
                          <tr>Di Sponsori Oleh</tr>
                        </td>
                        <td>
                          <tr> : {{ data.year }}</tr>
                          <tr> : {{ data.duration }}</tr>
                          <tr> : {{ data.sponsored_by }}</tr>
                        </td>
                      </table>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left"
            @click="(nonformaleducation = false), (formaleducation = true)" />
          <Button v-if="applicant.JobId.jobCategory.id === 2" class="p-button-sm" icon="pi pi-arrow-right"
            @click="(nonformaleducation = false), (computer = true)" style="float: right" />
          <Button v-else class="p-button-sm" icon="pi pi-arrow-right"
            @click="(nonformaleducation = false), (employhistory = true)" style="float: right" />
        </template>
      </Card>
      <Card v-if="computer">
        <template #title>
          Penguasaan Komputer dan Keahlian Khusus
          <span>
            <small><i>(Computer Literate and Special Skills)</i></small>
          </span>
        </template>
        <template #content>
          <Button @click="openModalComputer" icon="pi pi-plus" label="Tambah Skill" class="p-button-warning"
            v-tooltip.right="'Klik untuk menambahkan'" />
          <Dialog header="Program Aplikasi dan Keahlian Khusus" v-model:visible="displayModalComputer"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '80vw' }" :modal="true">
            <div>
              <div class="mt-2">
                <div class="grid">
                  <label for="skill" class="col-2">
                    <small>Jenis Program Aplikasi dan Keahlian Khusus</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="skill" v-model="computers.skill">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="email-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="level" class="col-2">
                    <small>Kemampuan</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Dropdown class="w-full" v-model="computers.level" :options="proficiens" optionLabel="proficiens_name"
                      optionValue="code" placeholder="Pilih Kemampuan" />
                  </div>
                </div>
              </div>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
              <Button label="Yes" icon="pi pi-check" @click="addComputer()" :disabled="!(meta.valid && meta.dirty)" />
            </template>
          </Dialog>
          <div v-if="computersArr.length > 0">
            <DataTable :value="computersArr">
              <Column field="skill" header="Kemampuan"></Column>
              <Column field="level" header="Penguasaan"></Column>
              <Column>
                <template #body="{ index }">
                  <Button icon="pi pi-trash" class="p-button-danger" @click="cancelEdu(index, computersArr)" />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(computer = false), (nonformaleducation = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(computer = false), (employhistory = true)"
            :disabled="computersArr.length === 0" style="float: right" />
        </template>
      </Card>
      <Card v-if="employhistory">
        <template #title>
          Riwayat Pekerjaan<span><small><i> (Mulai dari pekerjaan pertama s/d pekerjaan terakhir)</i></small></span>
        </template>
        <template #content>
          <Button @click="openDialogEmployHistory" icon="pi pi-plus" label="Tambah Riwayat Pekerjaan"
            class="p-button-warning" v-tooltip.right="'Klik untuk menambahkan'" />
          <Dialog header="Riwayat Pekerjaan" v-model:visible="dialogEmployHistory"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '80vw' }" :modal="true">
            <div>
              <div class="mt-2">
                <div class="grid">
                  <label for="start" class="col-2">
                    <small>Bulan / Tahun Mulai</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="start"
                      v-model="employmenthistory.start">
                      <InputText type="month" v-bind="field" :class="{ 'p-invalid': errorMessage }"
                        class="block w-full" />
                      <small id="start-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="end" class="col-2">
                    <small>Bulan / Tahun Selesai</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="end"
                      v-model="employmenthistory.end">
                      <InputText type="month" v-bind="field" :class="{ 'p-invalid': errorMessage }"
                        class="block w-full" />
                      <small id="end-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="name_company" class="col-2">
                    <small>Nama Perusahaan</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="name_company"
                      v-model="employmenthistory.name_company">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="name_company-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="position" class="col-2">
                    <small>Jabatan</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="position"
                      v-model="employmenthistory.position">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="position-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="direct_supervisor" class="col-2">
                    <small>Atasan Langsung</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="direct_supervisor"
                      v-model="employmenthistory.direct_supervisor">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="direct_supervisor-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="take_home_pay" class="col-2">
                    <small>Total Gaji</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="take_home_pay"
                      v-model="employmenthistory.take_home_pay">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="take_home_pay-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="grid">
                  <label for="reason_leaving" class="col-2">
                    <small>Alasan Keluar</small><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field v-slot="{ field, errorMessage }" :rules="isRequired" name="reason_leacing"
                      v-model="employmenthistory.reason_leaving">
                      <InputText v-bind="field" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
                      <small id="reason_leacing-help" class="p-error block">{{ errorMessage }}</small>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
              <Button label="Yes" icon="pi pi-check" @click="addhistory()" :disabled="!(meta.valid && meta.dirty)" />
            </template>
          </Dialog>
          <div class="flex justify-content-center">
            <div class="grid w-full">
              <div class="col-4 mt-3" v-for="(data, index) in employmenthistories" :key="index">
                <Card>
                  <template #header>
                    <div class="flex px-3 pt-1">
                      <p class="text-lg">
                        {{ data.position }}
                      </p>
                      <p class="cursor-pointer ml-3">
                        <i @click="cancelEdu(index, employmenthistories)" class="pi pi-trash text-xs">
                        </i>
                      </p>
                    </div>
                  </template>
                  <template #content>
                    <table border="0" class="m-0">
                      <td>
                        <tr>Mulai</tr>
                        <tr>Selesai</tr>
                        <tr>Nama Perusahaan</tr>
                        <tr>Atasan</tr>
                        <tr>Total Gaji</tr>
                        <tr>Alasan Keluar</tr>
                      </td>
                      <td>
                        <tr> : {{ data.start }}</tr>
                        <tr> : {{ data.end }}</tr>
                        <tr> : {{ data.name_company }}</tr>
                        <tr> : {{ data.direct_supervisor }}</tr>
                        <tr> : Rp.{{ data.take_home_pay }}</tr>
                        <tr> : {{ data.reason_leaving }}</tr>
                      </td>
                    </table>
                  </template>
                </Card>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <Button v-if="applicant.JobId.jobCategory.id === 2" class="p-button-sm" icon="pi pi-arrow-left"
            @click="(employhistory = false), (computer = true)" />
          <Button v-else class="p-button-sm" icon="pi pi-arrow-left"
            @click="(employhistory = false), (nonformaleducation = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(employhistory = false), (jobdesc = true)"
            style="float: right" />
        </template>
      </Card>
      <Card v-if="jobdesc">
        <template #title>
          Tugas dan Tanggung Jawab Pekerjaan<span><small> <i> (Di tempat terakhir anda bekerja)</i></small></span>
        </template>
        <template #content>
          <div class="mt-2">
            <div class="grid">
              <label for="description" class="col-2">
                <small>Job Deskripsi</small>
              </label>
              <div class="col">
                <Textarea v-model="jobdescription.description" rows="15" cols="115" />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(jobdesc = false), (employhistory = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(jobdesc = false), (otherinfo = true)"
            style="float: right" />
        </template>
      </Card>
      <Card v-if="otherinfo">
        <template #title>
          Keterangan Lainnya<span><small><i> (Other Informations)</i></small></span>
        </template>
        <template #content>
          <div class="mt-2 mx-3">
            <label for="hospitalized">
              <small>Apakah anda pernah dirawat di rumah sakit dan atau menderita sakit yang lama ?
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation.hospitalized" :options="hospitalized" optionLabel="val"
                optionValue="val" class="w-full" />
            </div>
          </div>
          <div class="mt-2 mx-3" v-if="otherinformation.hospitalized === 'ya'">
            <label for="disease">
              <small>(Jika Ya) Sakit apa ? </small>
            </label>
            <Field v-slot="{ field, errorMessage }" name="disease" :rules="isRequired" v-model="otherinformation.disease">
              <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="email-help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3" v-if="otherinformation.hospitalized === 'ya'">
            <label for="year">
              <small>Kapan ? </small>
            </label>
            <Field v-slot="{ field, errorMessage }" name="name" :rules="isRequired" v-model="otherinformation.year">
              <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="email-help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="reason_hire">
              <small>Mengapa kami bisa mempekerjakan anda? </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="reason_hire" :rules="isRequired"
              v-model="otherinformation.reason_hire">
              <InputText v-bind="field" aria-describedby="reason_hire_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="reason_hire_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="plan">
              <small>Sebutkan rencana jangka pendek dan rencana jangka panjang anda?</small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="plan" :rules="isRequired" v-model="otherinformation.plan">
              <InputText v-bind="field" aria-describedby="plan-help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="plan-help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="psycological_test">
              <small>Kapan terakhir anda mengikuti evaluasi psikologis (psikotest) ?</small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="psycological_test" :rules="isRequired"
              v-model="otherinformation.psycological_test">
              <InputText v-bind="field" aria-describedby="psycological_test_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="psycological_test_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="opinion_teamwork">
              <small>Informasikan pendapat anda tentang Kerjasama (Team Work) ?</small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="opinion_teamwork" :rules="isRequired"
              v-model="otherinformation.opinion_teamwork">
              <InputText v-bind="field" aria-describedby="opinion_teamwork_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="opinion_teamwork_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="respond_target">
              <small>Bagaimana tanggapan anda mengenai target yang akan diberikan oleh perusahaan
                kepada anda?
              </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="respond_target" :rules="isRequired"
              v-model="otherinformation.respond_target">
              <InputText v-bind="field" aria-describedby="respond_target_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="respond_target_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="respond_preasure">
              <small>Bagaimana tanggapan anda mengenai tekanan dalam pekerjaan? </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="respond_preasure" :rules="isRequired"
              v-model="otherinformation.respond_preasure">
              <InputText v-bind="field" aria-describedby="respond_preasure_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="respond_preasure_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="salary_expect">
              <small>Berapa gaji yang anda inginkan ? </small>
              <span style="color: red">*</span>
            </label>
            <InputNumber mode="currency" currency="IDR" locale="id-ID" v-model="otherinformation.salary_expect"
              name="salary_expect" :class="{ 'p-invalid': errorMessage }" class="block w-full" />
          </div>
          <div class="mt-2 mx-3">
            <label for="able_to_start">
              <small>Kapan anda dapat mulai bekerja ? </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="able_to_start" :rules="isRequired"
              v-model="otherinformation.able_to_start">
              <InputText v-bind="field" aria-describedby="able_to_start_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="able_to_start_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="contact_emergency">
              <small>Sebutkan orang terdekat yang bisa dihubungi dalam keadaan darurat ? </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="contact_emergency" :rules="isRequired"
              v-model="otherinformation.contact_emergency">
              <InputText v-bind="field" aria-describedby="contact_emergency_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="contact_emergency_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="relatives_in_ip">
              <small>Sebutkan nama kenalan anda di PT. Imani Prima dan hubungan anda dengannya sebagai?</small>
            </label>
            <Field v-slot="{ field }" name="relatives_in_ip" v-model="otherinformation.relatives_in_ip">
              <InputText v-bind="field" aria-describedby="relatives_in_ip" class="block w-full" />
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="strength">
              <small>Menurut anda apa kelebihan pada diri anda ? Sebutkan masing-masing 3 item.
              </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="strength" :rules="isRequired"
              v-model="otherinformation.strength">
              <InputText v-bind="field" aria-describedby="strength_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="strength_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="weakness">
              <small>Menurut anda apa kekurangan pada diri anda ? Sebutkan masing-masing 3 item.
              </small>
              <span style="color: red">*</span>
            </label>
            <Field v-slot="{ field, errorMessage }" name="weakness" :rules="isRequired"
              v-model="otherinformation.weakness">
              <InputText v-bind="field" aria-describedby="weakness_help" :class="{ 'p-invalid': errorMessage }"
                class="block w-full" />
              <small id="weakness_help" class="p-error block">{{ errorMessage }}</small>
            </Field>
          </div>
          <div class="mt-2 mx-3">
            <label for="part_time_job">
              <small>Apakah anda memiliki pekerjaan part time ?
              </small>
              <span style="color: red">*</span>
            </label>
            <Dropdown v-model="otherinformation.part_time_job" :options="hospitalized" optionLabel="val" class="w-full"
              optionValue="val" />
          </div>
          <div class="mt-2 mx-3" v-if="otherinformation.part_time_job === 'ya'">
            <label for="about_part_time_job">
              <small>(Jika Ya) dimana dan sebagai apa ? </small>
            </label>
            <Field v-slot="{ field }" name="about_part_time_job" :rules="isRequired"
              v-model="otherinformation.about_part_time_job">
              <InputText v-bind="field" class="block w-full" />
            </Field>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(otherinfo = false), (jobdesc = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(otherinfo = false), (otherinfo2 = true)"
            :disabled="!(meta.valid && meta.dirty)" style="float: right" />
        </template>
      </Card>
      <Card v-if="otherinfo2">
        <template #title>
          Keterangan Lainnya<span><small><i> (Other Informations)</i></small></span>
        </template>
        <template #content>
          <div class="mt-2 mx-3">
            <label for="hospitalized">
              <small>Apakah anda pernah dirawat di rumah sakit dan atau menderita sakit yang lama ?
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation.hospitalized" :options="hospitalized" optionLabel="val"
                optionValue="val" class="w-full" />
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="overtime">
              <small>Apakah anda bersedia bekerja lembur?</small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation2.overtime" :options="hospitalized" optionLabel="val" optionValue="val"
                class="w-full" />
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="work_on_holiday">
              <small>Apakah anda bersedia bekerja dihari libur? (hari Sabtu, Minggu, atau Hari Libur Nasional)
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation2.work_on_holiday" :options="hospitalized" optionLabel="val"
                optionValue="val" class="w-full" />
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="out_town_duty">
              <small>Apakah anda bersedia dinas keluar kota ?
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation2.out_town_duty" :options="hospitalized" optionLabel="val"
                optionValue="val" class="w-full" />
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="shifting">
              <small>Apakah anda bersedia bekerja secara shift? (posisi: Security dan IT Helpdesk)
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation2.shifting" :options="hospitalized" optionLabel="val" optionValue="val"
                class="w-full" />
            </div>
          </div>
          <div class="mt-2 mx-3">
            <label for="giving_reference">
              <small>Apakah Anda bersedia, jika Kami meminta referensi pada perusahaan Anda bekerja sebelumnya
              </small>
              <span style="color: red">*</span>
            </label>
            <div>
              <Dropdown v-model="otherinformation2.giving_reference" :options="hospitalized" optionLabel="val"
                optionValue="val" class="w-full" />
            </div>
          </div>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(otherinfo2 = false), (otherinfo = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(otherinfo2 = false), (agreement = true)"
            style="float: right" />
        </template>
      </Card>
      <Card v-if="agreement">
        <template #title>
          Halaman Persetujuan<span><small><i> (Agreement)</i></small></span>
        </template>
        <template #content>
          <p>Dengan ini saya menyatakan bahwa seluruh informasi yang saya berikan adalah benar dan lengkap. Saya sungguh
            memahami, menerima, dan menyetujui jika terdapat pernyataan yang tidak sesuai atau tidak benar dengan apa
            yang telah saya tuliskan di atas akan menyebabkan batalnya lamaran ini dan atau saya bersedia mengundurkan
            diri apabila saya telah diterima bekerja oleh Perusahaan.</p>
          <Checkbox v-model="agree" :binary="true" inputId="agreement" />
          <label for="agreement" class="mb-0 ml-2">Saya Menyetujui Semua Syarat dan Ketentuan tersebut</label>
        </template>
        <template #footer>
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(agreement = false), (otherinfo2 = true)" />
          <Button v-if="loading" class="p-button-sm" icon="pi pi-spin pi-spinner" label="Loading" :disabled="true" style="float: right" />
          <Button v-else class="p-button-sm" icon="pi pi-save" label="Save" :disabled="!agree" style="float: right"
            type="submit" />
        </template>
      </Card>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useStore } from '~~/stores/applicant_auth';

definePageMeta({
  layout: false,
  middleware: [
    async function (to, from) {
      const store = useStore();
      await store.auth();
    },
  ],
});

onMounted(async () => {
  await getJob();
  await getProvinsi();
});

const toast = useToast();
const config = useRuntimeConfig();
const router = useRouter();
const jobs = ref([]);
const user = useCookie("user");

//data
const displayModal = ref(false);
const applicant = ref({
  name: "",
  gender: "",
  place_of_birth: "",
  date: "",
  blood_type: "",
  province: "",
  city: "",
  district: "",
  subdistrict: "",
  address: "",
  postal_code_address: "",
  province_dom: "",
  city_dom: "",
  district_dom: "",
  subdistrict_dom: "",
  domicile: "",
  postal_code_domicile: "",
  mobile: "",
  office_parent_phone: "",
  email: user.value.email,
  religion: "",
  JobId: "",
  photo: "",
  marital_status: "",
  year_marriage: "",
});
const formaleducations = ref([]);
let formaleducate = reactive({
  level: "",
  name_location: "",
  location: "",
  major: "",
  entry: "",
  graduate: "",
  ip_rata: "",
});
const displayModalNonformal = ref(false);
const nonformaleducations = ref([]);
const nonformaleducate = ref({
  course: "",
  year: "",
  duration: "",
  certificate: "",
  sponsored_by: "",
});
const displayModalComputer = ref(false);
const computersArr = ref([]);
let computers = reactive(
  {
    skill: "",
    level: "",
  },
);
const dialogEmployHistory = ref(false);
const employmenthistories = ref([]);
const employmenthistory = ref({
  start: "",
  end: "",
  name_company: "",
  position: "",
  direct_supervisor: "",
  take_home_pay: "",
  reason_leaving: "",
});
const jobdescription = reactive({
  description: "",
});
const otherinformation = ref({
  hospitalized: "",
  disease: "",
  year: "",
  reason_hire: "",
  plan: "",
  psycological_test: "",
  opinion_teamwork: "",
  respond_target: "",
  respond_preasure: "",
  salary_expect: "",
  able_to_start: "",
  contact_emergency: "",
  relatives_in_ip: "",
  strength: "",
  weakness: "",
  part_time_job: "",
  about_part_time_job: "",
});
const otherinformation2 = ref({
  overtime: "",
  work_on_holiday: "",
  out_town_duty: "",
  shifting: "",
  giving_reference: "",
});
const agree = ref(false);
const levels = [
  { level_name: "Pasca Sarjana (S2)", code: "S2" },
  { level_name: "Sarjana (S1)", code: "S1" },
  { level_name: "Akademi (D3)", code: "D3" },
  { level_name: "SMU", code: "SMU" },
];
const proficiens = [
  { proficiens_name: "Baik", code: "baik" },
  { proficiens_name: "Cukup", code: "cukup" },
  { proficiens_name: "Kurang", code: "kurang" },
];
const hospitalized = [
  { val: "ya" },
  { val: "tidak" },
];

//function
const onUploadAva = (evt) => {
  let f = evt.files[0];
  // newAttachment.type = f.type;
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onloadend = function () {
    applicant.value.photo = reader.result;
  };
};
const getJob = async () => {
  try {
    const response = await axios.get(config.API_BASE_URL + "jobs");
    jobs.value = response.data.data;
  } catch (err) {
    console.log(err);
  }
};
const addFormalEducation = () => {
  formaleducations.value.push(formaleducate);
  formaleducate = {
    level: "",
    name_location: "",
    location: "",
    major: "",
    entry: "",
    graduate: "",
    ip_rata: "",
  };
  openModal();
};
const addnonFormal = () => {
  nonformaleducations.value.push(nonformaleducate.value);
  nonformaleducate.value = {
    course: "",
    year: "",
    duration: "",
    certificate: "",
    sponsored_by: "",
  };
  openDialogNonformal();
};
const openModalComputer = () => {
  displayModalComputer.value = !displayModalComputer.value;
};
const addComputer = () => {
  computersArr.value.push(computers);
  computers = {
    skill: "",
    level: "",
  }
  openModalComputer();
}
const addhistory = () => {
  employmenthistories.value.push(employmenthistory.value);
  employmenthistory.value = {
    start: "",
    end: "",
    name_company: "",
    position: "",
    direct_supervisor: "",
    take_home_pay: "",
    reason_leaving: "",
  }
  openDialogEmployHistory();
};

//function modal
const openModal = () => {
  displayModal.value = !displayModal.value;
};
const openDialogNonformal = () => {
  displayModalNonformal.value = !displayModalNonformal.value;
};
const openDialogEmployHistory = () => {
  dialogEmployHistory.value = !dialogEmployHistory.value;
}
const cancelEdu = (index, arr) => {
  arr.splice(index, 1)
};
const showWarn = () => {
  toast.add({
    severity: "warn",
    summary: "Sukses isi Form",
    detail: "Form Anda Lengkap, Silahkan tunggu halaman selanjutnya",
    life: 3000,
  });
};

let apply = ref(true);
let personal1 = ref(false);
let family = ref(false);
let formaleducation = ref(false);
let nonformaleducation = ref(false);
let computer = ref(false);
let employhistory = ref(false);
let jobdesc = ref(false);
let otherinfo = ref(false);
let otherinfo2 = ref(false);
let agreement = ref(false);
const loading = ref(false);

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

async function save(values) {
  if (applicant.value.photo === null)
    return (applicant.value.photo = "https://via.placeholder.com/120x120?text=FOTO");
  try {
    // console.log(applicant.value);
    // console.log(formaleducations.value);
    // console.log(nonformaleducations.value);
    // console.log(computersArr.value);
    // console.log(employmenthistories.value);
    // console.log(jobdescription.description);
    // console.log(otherinformation.value);
    loading.value = true;
    await axios
      .post(config.API_BASE_URL + "applicants", {
        applicant: {
          jobPosition: applicant.value.JobId.name,
          ApplicantAuthId: user.value.id,
          name: applicant.value.name,
          gender: applicant.value.gender,
          place_of_birth: applicant.value.place_of_birth,
          date: applicant.value.date,
          blood_type: applicant.value.blood_type,
          province: applicant.value.province ? applicant.value.province.nama : "",
          city: applicant.value.city ? applicant.value.city.nama : "",
          district: applicant.value.district ? applicant.value.district.nama : "",
          subdistrict: applicant.value.subdistrict ? applicant.value.subdistrict.nama : "",
          address: applicant.value.address,
          postal_code_address: applicant.value.postal_code_address,
          province_dom: applicant.value.province_dom ? applicant.value.province_dom.nama : "",
          city_dom: applicant.value.city_dom ? applicant.value.city_dom.nama : "",
          district_dom: applicant.value.district_dom ? applicant.value.district_dom.nama : "",
          subdistrict_dom: applicant.value.subdistrict_dom ? applicant.value.subdistrict_dom.nama : "",
          domicile: applicant.value.domicile,
          postal_code_domicile: applicant.value.postal_code_domicile,
          mobile: applicant.value.mobile,
          office_parent_phone: applicant.value.office_parent_phone,
          email: applicant.value.email,
          religion: applicant.value.religion,
          JobId: applicant.value.JobId.id,
          photo: applicant.value.photo,
          martial_status: applicant.value.marital_status,
          year_marriage: applicant.value.year_marriage,
          status: "Selesai Mengisi Tahap  1",
          isCandidate: 0,
        },
        formaleducation: formaleducations.value,
        nonformaleducation: nonformaleducations.value,
        computerliterate: computersArr.value,
        employmenthistory: employmenthistories.value,
        jobdescription: {
          description: jobdescription.description,
        },
        otherinformation: {
          hospitalized: otherinformation.value.hospitalized,
          disease: otherinformation.value.disease,
          year: otherinformation.value.year,
          reason_hire: otherinformation.value.reason_hire,
          plan: otherinformation.value.plan,
          psycological_test: otherinformation.value.psycological_test,
          opinion_teamwork: otherinformation.value.opinion_teamwork,
          respond_target: otherinformation.value.respond_target,
          respond_preasure: otherinformation.value.respond_preasure,
          salary_expect: otherinformation.value.salary_expect,
          able_to_start: otherinformation.value.able_to_start,
          contact_emergency: otherinformation.value.contact_emergency,
          relatives_in_ip: otherinformation.value.relatives_in_ip,
          strength: otherinformation.value.strength,
          weakness: otherinformation.value.weakness,
          part_time_job: otherinformation.value.part_time_job,
          about_part_time_job: otherinformation.value.about_part_time_job,
          overtime: otherinformation2.value.overtime,
          work_on_holiday: otherinformation2.value.work_on_holiday,
          out_town_duty: otherinformation2.value.out_town_duty,
          shifting: otherinformation2.value.shifting,
          giving_reference: otherinformation2.value.giving_reference,
        },
      })
      .then((response) => {
        toast.add({
          severity: "warn",
          summary: "Sukses",
          detail: response.data.message,
          life: 3000,
        });
      });

    loading.value = false;
    setTimeout(() => {
      router.push({
        path: "/formapplication/dashboard/",
      });
    }, 1000);
  } catch (err) {
    console.log(err);
  }
}

const EXT_API_URL = "https://dev.farizdotid.com/api/daerahindonesia/";
const dataProvinsi = ref([]);
const dataKecamatan = ref([]);
const dataDesaKel = ref([]);
const dataKotaKab = ref([]);

const dataKotaKab_dom = ref([]);
const dataKecamatan_dom = ref([]);
const dataDesaKel_dom = ref([]);

const getProvinsi = async () => {
  const res = await axios.get(EXT_API_URL + "provinsi");
  dataProvinsi.value = res.data.provinsi;
};

const getKota = async (id_prov, whoIs) => {
  const res = await axios.get(EXT_API_URL + "kota?id_provinsi=" + id_prov);
  if (whoIs === "ktp") {
    dataKotaKab.value = res.data.kota_kabupaten;
  } else if (whoIs === "domicile") {
    dataKotaKab_dom.value = res.data.kota_kabupaten;
  }
};

const getKecamatan = async (id_kota, whoIs) => {
  const res = await axios.get(EXT_API_URL + "kecamatan?id_kota=" + id_kota);
  if (whoIs === "ktp") {
    dataKecamatan.value = res.data.kecamatan;
  } else if (whoIs === "domicile") {
    dataKecamatan_dom.value = res.data.kecamatan;
  }
};

const getDesaKel = async (id_kec, whoIs) => {
  const res = await axios.get(EXT_API_URL + "kelurahan?id_kecamatan=" + id_kec);
  if (whoIs === "ktp") {
    dataDesaKel.value = res.data.kelurahan;
  } else if (whoIs === "domicile") {
    dataDesaKel_dom.value = res.data.kelurahan;
  }
};
</script>

<style>
.card {
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 20px;
}
</style>
