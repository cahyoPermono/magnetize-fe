<template>
  <div>
    <div>
      <Toast />
    </div>
    <div class="card">
      <Form v-slot="{ meta }" @submit="save">
        <div v-if="apply">
          <div class="card-body">
            <div class="mt-2">
              <div class="row">
                <div class="col-sm-10">
                  <img src="~/assets/LogoImani.png" /><br /><br />
                  <h5>FORMULIR LAMARAN KERJA</h5>
                  <h6>Application Form</h6>
                  <br />
                </div>
                <div class="col-sm">
                  <div class="b">
                    <Avatar
                      class="mr-2"
                      :image="applicant.photo"
                      size="xlarge"
                      style="width: 120px; height: 120px"
                    />
                  </div>
                  <div class="b">
                    <label for="pp">Foto</label>
                    <FileUpload
                      name="demo[]"
                      mode="basic"
                      :customUpload="true"
                      @uploader="onUploadAva"
                      accept="image/*"
                      :maxFileSize="2000000"
                      :auto="true"
                    />
                  </div>
                </div>
              </div>
              <div class="row" style="margin-top: 35px">
                <label for="position" class="col-sm-2 col-form-label">
                  <small>Posisi yang dilamar</small
                  ><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <select
                    name="jobs"
                    class="form-control"
                    v-model="applicant.JobId"
                  >
                    <option v-for="job in jobs" :value="job.id" :key="job.id">
                      {{ job.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <Button class="p-button-text" :disabled="true" />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(apply = false), (personal1 = true)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="personal1">
          <div class="card-header">
            Data Pribadi&nbsp;<span><small>(Personal Data)</small></span>
          </div>

          <div class="card-body">
            <div class="mt-2">
              <div class="row">
                <label for="name" class="col-sm-2 col-form-label">
                  <small>Nama Lengkap</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="name"
                    :rules="isRequired"
                    v-model="applicant.name"
                  />
                  <ErrorMessage name="name">
                    <small style="color: red">Name is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <div class="row">
                <label for="gender" class="col-sm-2 col-form-label">
                  <small>Gender</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    type="radio"
                    name="applicant_gender"
                    value="L"
                    :rules="isRequired"
                    v-model="applicant.gender"
                  />&nbsp;&nbsp;
                  <label for="applicant_gender" class="col-form-label"
                    ><small>Laki-Laki</small></label
                  >&nbsp;&nbsp;&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="applicant_gender"
                    value="P"
                    :rules="isRequired"
                    v-model="applicant.gender"
                  />&nbsp;&nbsp;
                  <label for="applicant_gender" class="col-form-label"
                    ><small>Perempuan</small></label
                  >
                  <ErrorMessage name="applicant_gender">
                    <small style="color: red">Gender is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <div class="row">
                <label for="place_of_birth" class="col-sm-2 col-form-label">
                  <small>Tempat Lahir</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="place_of_birth"
                    :rules="isRequired"
                    v-model="applicant.place_of_birth"
                  />
                  <ErrorMessage name="place_of_birth">
                    <small style="color: red">Place of Birth is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <div class="row">
                <label for="date" class="col-sm-2 col-form-label">
                  <small>Tanggal Lahir</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="date"
                    type="date"
                    :rules="isRequired"
                    v-model="applicant.date"
                  />
                  <ErrorMessage name="date">
                    <small style="color: red">Date of Birth is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <!-- <div class="mt-2">
              <div class="row">
                <label for="blood_type" class="col-sm-2 col-form-label">
                  <small>Gol Darah</small>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="blood_type"
                    v-model="applicant.blood_type"
                  />
                </div>
              </div>
            </div> -->

            <div class="mt-2">
              <div class="row">
                <label for="blood_type" class="col-sm-2 col-form-label">
                  <small>Gol Darah</small>
                </label>
                <div class="col-sm">
                  <Field
                    type="radio"
                    name="blood_type"
                    value="A"
                    v-model="applicant.blood_type"
                  />
                  &nbsp;
                  <label for="blood_type" class="col-form-label"
                    ><small>A</small></label
                  >&nbsp;&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="blood_type"
                    value="B"
                    v-model="applicant.blood_type"
                  />&nbsp;
                  <label for="blood_type" class="col-form-label"
                    ><small>B</small></label
                  >&nbsp;&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="blood_type"
                    value="AB"
                    v-model="applicant.blood_type"
                  />&nbsp;
                  <label for="blood_type" class="col-form-label"
                    ><small>AB</small></label
                  >&nbsp;&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="blood_type"
                    value="O"
                    v-model="applicant.blood_type"
                  />
                  &nbsp;
                  <label for="blood_type" class="col-form-label"
                    ><small>O</small></label
                  >&nbsp;&nbsp;&nbsp;
                  <ErrorMessage name="religion">
                    <small style="color: red">Religion is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <div class="row">
                <label for="mobile" class="col-sm-2 col-form-label">
                  <small>Handphone</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="mobile"
                    :rules="isRequired"
                    v-model="applicant.mobile"
                  />
                  <ErrorMessage name="mobile">
                    <small style="color: red">Mobile is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <div class="row">
                <label for="email" class="col-sm-2 col-form-label">
                  <small>Email</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    type="email"
                    name="email"
                    :rules="isRequired"
                    v-model="applicant.email"
                  />
                  <ErrorMessage name="email">
                    <small style="color: red">Email is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <div class="row">
                <label for="id_sim_no" class="col-sm-2 col-form-label">
                  <small>No. KTP</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="id_sim_no"
                    :rules="isRequired"
                    v-model="applicant.id_sim_no"
                  />
                  <ErrorMessage name="id_sim_no">
                    <small style="color: red">ID No. is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="valid_to" class="col-sm-2 col-form-label">
                  <small>Berlaku s.d</small>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="valid_to"
                    v-model="applicant.valid_to"
                  />
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="religion" class="col-sm-2 col-form-label">
                  <small>Agama</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    type="radio"
                    name="religion"
                    value="islam"
                    :rules="isRequired"
                    v-model="applicant.religion"
                  />
                  &nbsp;
                  <label for="religion" class="col-form-label"
                    ><small>Islam</small></label
                  >&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="religion"
                    value="katholik"
                    :rules="isRequired"
                    v-model="applicant.religion"
                  />&nbsp;
                  <label for="religion" class="col-form-label"
                    ><small>Katholik</small></label
                  >&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="religion"
                    value="protestan"
                    :rules="isRequired"
                    v-model="applicant.religion"
                  />&nbsp;
                  <label for="religion" class="col-form-label"
                    ><small>Protestan</small></label
                  >&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="religion"
                    value="budha"
                    :rules="isRequired"
                    v-model="applicant.religion"
                  />
                  &nbsp;
                  <label for="religion" class="col-form-label"
                    ><small>Budha</small></label
                  >&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="religion"
                    value="hindu"
                    :rules="isRequired"
                    v-model="applicant.religion"
                  />
                  &nbsp;
                  <label for="religion" class="col-form-label"
                    ><small>Hindu</small></label
                  >&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="religion"
                    value="lainnya"
                    :rules="isRequired"
                    v-model="applicant.religion"
                  />&nbsp;
                  <label for="religion" class="col-form-label"
                    ><small>Lainnya</small></label
                  >&nbsp;&nbsp;
                  <ErrorMessage name="religion">
                    <small style="color: red">Religion is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(personal1 = false), (apply = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(personal1 = false), (personal2 = true)"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="personal2">
          <div class="card-header">
            Data Pribadi&nbsp;<span><small>(Personal Data)</small></span>
          </div>
          <div class="card-body">
            <div class="mt-4">
              <div class="row">
                <div class="col-sm-2">
                  <label for="address">
                    <small>Alamat Rumah (sesuai KTP)</small
                    ><span style="color: red">*</span>
                  </label>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="province"
                    class="form-control"
                    as="select"
                    v-model="applicant.province"
                    @change="getKota(applicant.province[0], 'ktp')"
                  >
                    <option
                      v-for="data in dataProvinsi"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="province">
                    <small style="color: red">Province is required</small>
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="city"
                    class="form-control"
                    as="select"
                    v-model="applicant.city"
                    @change="getKecamatan(applicant.city[0], 'ktp')"
                  >
                    <option
                      v-for="data in dataKotaKab"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="city">
                    <small style="color: red">city is required</small>
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="district"
                    class="form-control"
                    as="select"
                    v-model="applicant.district"
                    @change="getDesaKel(applicant.district[0], 'ktp')"
                  >
                    <option
                      v-for="data in dataKecamatan"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="district">
                    <small style="color: red">district is required</small>
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="subdistrict"
                    class="form-control"
                    as="select"
                    v-model="applicant.subdistrict"
                  >
                    <option
                      v-for="data in dataDesaKel"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="subdistrict">
                    <small style="color: red">subdistrict is required</small>
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    class="form-control"
                    name="postal_code"
                    type="text"
                    :rules="isRequired"
                    v-model="applicant.postal_code_address"
                    placeholder="Kode Pos"
                  />
                  <ErrorMessage name="postal_code">
                    <small style="color: red">Postal Code is required</small>
                  </ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-10 offset-sm-2">
                  <Field
                    class="form-control"
                    name="address"
                    type="text"
                    :rules="isRequired"
                    v-model="applicant.address"
                    placeholder="Alamat Lengkap"
                  />
                  <ErrorMessage name="address">
                    <small style="color: red">Address is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="row">
                <div class="col-sm-2">
                  <label for="address">
                    <small>Alamat Rumah (Domisili)</small
                    ><span style="color: red">*</span>
                  </label>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="province_dom"
                    class="form-control"
                    as="select"
                    v-model="applicant.province_dom"
                    @change="getKota(applicant.province_dom[0], 'domicile')"
                  >
                    <option
                      v-for="data in dataProvinsi"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="province_dom">
                    <small style="color: red">Province_dom is required</small>
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="city_dom"
                    class="form-control"
                    as="select"
                    v-model="applicant.city_dom"
                    @change="getKecamatan(applicant.city_dom[0], 'domicile')"
                  >
                    <option
                      v-for="data in dataKotaKab_dom"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="city_dom">
                    <small style="color: red">city_dom is required</small>
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    name="district_dom"
                    class="form-control"
                    as="select"
                    v-model="applicant.district_dom"
                    @change="getDesaKel(applicant.district_dom[0], 'domicile')"
                  >
                    <option
                      v-for="data in dataKecamatan_dom"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="district_dom">
                    <small style="color: red">district_dom is required</small>
                  </ErrorMessage>
                </div>

                <div class="col-sm-2">
                  <Field
                    name="subdistrict_dom"
                    class="form-control"
                    as="select"
                    v-model="applicant.subdistrict_dom"
                  >
                    <option
                      v-for="data in dataDesaKel_dom"
                      :key="data.id"
                      :value="[data.id, data.nama]"
                    >
                      {{ data.nama }}
                    </option>
                  </Field>
                  <ErrorMessage name="subdistrict_dom">
                    <small style="color: red"
                      >subdistrict_dom is required</small
                    >
                  </ErrorMessage>
                </div>
                <div class="col-sm-2">
                  <Field
                    class="form-control"
                    name="postal_code_dom"
                    type="text"
                    :rules="isRequired"
                    v-model="applicant.postal_code_domicile"
                    placeholder="Kode Pos"
                  />
                  <ErrorMessage name="postal_code_dom">
                    <small style="color: red">Postal Code is required</small>
                  </ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-10 offset-sm-2">
                  <Field
                    class="form-control"
                    name="domicile"
                    type="text"
                    :rules="isRequired"
                    v-model="applicant.domicile"
                    placeholder="Alamat Lengkap"
                  />
                  <ErrorMessage name="domicile">
                    <small style="color: red">Domicile is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="row">
                <label
                  for="office_parent_phone"
                  class="col-sm-2 col-form-label"
                >
                  <small>No HP Orang Tua</small>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="office_parent_phone"
                    v-model="applicant.office_parent_phone"
                  />
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="row">
                <label for="npwp_no" class="col-sm-2 col-form-label">
                  <small>No. NPWP (jika ada)</small>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="npwp_no"
                    v-model="applicant.npwp_no"
                  />
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="row">
                <label for="account_no" class="col-sm-2 col-form-label">
                  <small>No. Rekening (jika ada)</small>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="account_no"
                    v-model="applicant.account_no"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(personal2 = false), (personal1 = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(personal2 = false), (family = true)"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>
        <div v-if="family">
          <div class="card-header">
            Data Keluarga&nbsp;<span><small>(Family Data)</small></span>
          </div>

          <div class="card-body">
            <div class="mt-2">
              <div class="row">
                <label for="marital_status" class="col-2 col-form-label">
                  <small>Status Perkawinan</small
                  ><span style="color: red">*</span>
                </label>
                <div class="col">
                  <Field
                    type="radio"
                    name="marital_status"
                    value="lajang"
                    :rules="isRequired"
                    v-model="applicant.marital_status"
                  />&nbsp;
                  <label for="marital_status" class="col-form-label"
                    ><small>Lajang</small></label
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="marital_status"
                    value="janda/duda"
                    :rules="isRequired"
                    v-model="applicant.marital_status"
                  />&nbsp;
                  <label for="marital_status" class="col-form-label"
                    ><small>Janda/Duda</small></label
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Field
                    type="radio"
                    name="marital_status"
                    value="menikah"
                    :rules="isRequired"
                    v-model="applicant.marital_status"
                  />&nbsp;
                  <label for="marital_status" class="col-form-label"
                    ><small>Menikah, Tahun</small></label
                  >&nbsp;&nbsp;
                  <InputText
                    v-if="
                      applicant.marital_status === 'lajang' ||
                      applicant.marital_status === 'janda/duda'
                    "
                    class="p-inputtext-sm"
                    name="year_marriage"
                    type="text"
                    v-model="applicant.year_marriage"
                    readonly
                  />
                  <InputText
                    v-else
                    class="p-inputtext-sm"
                    name="year_marriage"
                    type="text"
                    v-model="applicant.year_marriage"
                  />

                  <ErrorMessage name="marital_status">
                    <small style="color: red">Marital Status is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <Button
              @click="openModal"
              icon="pi pi-plus"
              class="p-button-warning"
              label="tambah anggota keluarga"
              v-tooltip.right="'Klik untuk menambahkan'"
            />
            <div class="mt-2">
              <div class="row">
                <div
                  class="col-4"
                  v-for="(family, index) in families"
                  :key="index"
                  style="min-width: 0vw"
                >
                  <div class="card">
                    <div class="row">
                      <div
                        class="col-sm-2 col-offset-10 text-secondary"
                        style="cursor: pointer"
                        @click="popIndex(index)"
                      >
                        x
                      </div>
                    </div>
                    <div class="p-2">
                      <p class="fs-6 my-1"><b>Nama : </b> {{ family.name }}</p>
                      <p class="fs-6 my-1">
                        <b>Sebagai : </b> {{ family.member }}
                      </p>
                      <p class="fs-6 my-1">
                        <b>Gender : </b> {{ family.gender }}
                      </p>
                      <p class="fs-6 my-1">
                        <b>Tanggal Lahir : </b> {{ family.date }}
                      </p>
                      <p class="fs-6 my-1">
                        <b>Pendidikan : </b> {{ family.education }}
                      </p>
                      <p class="fs-6 my-1">
                        <b>Pekerjaan : </b> {{ family.occupation_company }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Dialog
              header="Tambah Data Keluarga"
              v-model:visible="displayModal"
              :breakpoints="{ '960px': '85vw', '640px': '90vw' }"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <div class="mt-2">
                <div class="row">
                  <label for="member" class="col-3 col-form-label">
                    <small>Anggota Keluarga</small
                    ><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Dropdown
                      v-model="fams.member"
                      :name="`families[${index}][member]`"
                      :options="members"
                      optionLabel="member_name"
                      optionValue="code"
                      placeholder="Select a Member"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="fams_name" class="col-3 col-form-label">
                    <small>Nama</small><span style="color: red">*</span>
                  </label>
                  <div class="col">

                    <Field
                      class="form-control"
                      :name="`families[${index}][name]`"
                      :rules="isRequired"
                      v-model="fams.name"
                    />
                    <ErrorMessage :name="`families[${index}][name]`">
                      <small style="color: red">Family Name is required</small>
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="fams_gender" class="col-3 col-form-label">
                    <small>Jenis Kelamin</small
                    ><span style="color: red">*</span>
                  </label>
                  <div class="col">

                    <Field
                      type="radio"
                      value="L"
                      :rules="isRequired"
                      v-model="fams.gender"
                      :name="`families[${index}][gender]`"
                    />&nbsp;
                    <label for="fams_gender" class="col-form-label"
                      ><small>Laki-Laki</small></label
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Field
                      type="radio"
                      :name="`families[${index}][gender]`"
                      value="P"
                      :rules="isRequired"
                      v-model="fams.gender"
                    />&nbsp;
                    <label for="fams_gender" class="col-form-label"
                      ><small>Perempuan</small></label
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <ErrorMessage :name="`families[${index}][gender]`">
                      <small style="color: red">Gender is required</small>
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="fams_date" class="col-3 col-form-label">
                    <small>Tanggal Lahir</small
                    ><span style="color: red">*</span>
                  </label>
                  <div class="col">
                    <Field
                      class="form-control"
                      type="date"
                      :name="`families[${index}][date]`"
                      :rules="isRequired"
                      v-model="fams.date"
                    />
                    <ErrorMessage :name="`families[${index}][date]`">
                      <small style="color: red"
                        >Date of Birth is required</small
                      >
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="education" class="col-3 col-form-label">
                    <small>Pendidikan</small>
                  </label>
                  <div class="col">

                    <Field
                      class="form-control"
                      :name="`families[${index}][education]`"
                      v-model="fams.education"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="occupation_company" class="col-3 col-form-label">
                    <small>Pekerjaan & Perusahaan</small>
                  </label>
                  <div class="col">
                    <Field
                      class="form-control"
                      :name="`families[${index}][occupation_company]`"
                      v-model="fams.occupation_company"
                      v-tooltip.top="'Pekerjaan - Perusahaan'"
                    />
                  </div>
                </div>
              </div>
              <template #footer>
                <Button
                  label="No"
                  icon="pi pi-times"
                  @click="closeModal"
                  class="p-button-text"
                />
                <Button
                  label="Tambahkan"
                  icon="pi pi-check"
                  @click="addFamily"
                />
              </template>
            </Dialog>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(family = false), (personal2 = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(family = false), (formaleducation = true)"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="formaleducation">
          <div class="card-header">
            Pendidikan Formal<span><small> (Formal Education)</small></span>
          </div>
          <div class="card-body">
            <div class="mt-2">
              <div class="row">
                <label for="level" class="col-sm-3 col-form-label">
                  <small>Level</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Dropdown
                    v-model="formaleducate.level"
                    :options="levels"
                    optionLabel="level_name"
                    optionValue="code"
                    placeholder="Select a Level"
                  />
                  <ErrorMessage name="level">
                    <small style="color: red">Education is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="name_location" class="col-sm-2 col-form-label">
                  <small>Sekolah / Perguruan Tinggi</small
                  ><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="name_location"
                    :rules="isRequired"
                    v-model="formaleducate.name_location"
                    v-tooltip.top="'Nama - Lokasi'"
                  />
                  <ErrorMessage name="name_location">
                    <small style="color: red"
                      >Name & Location is required</small
                    >
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="location" class="col-sm-2 col-form-label">
                  <small>Lokasi</small
                  ><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="location"
                    :rules="isRequired"
                    v-model="formaleducate.location"
                    v-tooltip.top="'Lokasi'"
                  />
                  <ErrorMessage name="location">
                    <small style="color: red"
                      >Location is required</small
                    >
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="major" class="col-sm-3 col-form-label">
                  <small>Jurusan</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="major"
                    :rules="isRequired"
                    v-model="formaleducate.major"
                  />
                  <ErrorMessage name="major">
                    <small style="color: red">Major is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="gpa" class="col-sm-2 col-form-label">
                  <small>Nilai rata-rata</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="gpa"
                    :rules="isRequired"
                    v-model="formaleducate.gpa"
                  />
                  <ErrorMessage name="gpa">
                    <small style="color: red">GPA is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="entry" class="col-sm-2 col-form-label">
                  <small>Tahun Masuk</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="entry"
                    type="month"
                    :rules="isRequired"
                    v-model="formaleducate.entry"
                  />
                  <ErrorMessage name="entry">
                    <small style="color: red">Entry is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="graduate" class="col-sm-3 col-form-label">
                  <small>Tahun Lulus</small><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="graduate"
                    type="month"
                    :rules="isRequired"
                    v-model="formaleducate.graduate"
                  />
                  <ErrorMessage name="graduate">
                    <small style="color: red">Graduate is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="row">
                <label for="ip_rata" class="col-sm-3 col-form-label">
                  <small>IPK / Nilai Rata-Rata</small
                  ><span style="color: red">*</span>
                </label>
                <div class="col-sm">
                  <Field
                    class="form-control"
                    name="ip_rata"
                    :rules="isRequired"
                    v-model="formaleducate.ip_rata"
                  />
                  <ErrorMessage name="ip_rata">
                    <small style="color: red">IPK is required</small>
                  </ErrorMessage>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(formaleducation = false), (family = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(formaleducation = false), (nonformaleducation = true)"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="nonformaleducation">
          <div class="card-header">
            Pendidikan Non Formal<span
              ><small> <i>(Non Formal Education)</i></small></span
            >
          </div>
          <div class="card-body">
            <Button
              @click="addnonFormal"
              icon="pi pi-plus"
              class="p-button-warning"
              v-tooltip.right="'Klik untuk menambahkan'"
            />
            <div
              v-for="(nonformaleducate, index) in nonformaleducations"
              :key="index"
            >
              <div class="mt-2">
                <div class="row">
                  <label for="course" class="col-sm-3 col-form-label">
                    <small>Jenis Kursus / Training / Seminar</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`nonformaleducations[${index}][course]`"
                      v-model="nonformaleducate.course"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="year" class="col-sm-3 col-form-label">
                    <small>Tahun</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`nonformaleducations[${index}][year]`"
                      v-model="nonformaleducate.year"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="duration" class="col-sm-3 col-form-label">
                    <small>Lama</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`nonformaleducations[${index}][duration]`"
                      v-model="nonformaleducate.duration"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="certificate" class="col-sm-3 col-form-label">
                    <small>Sertifikat</small>
                  </label>
                  <div class="col-sm">
                    <FileUpload
                      name="demo[]"
                      mode="basic"
                      @upload="onUploadCerti($event, index)"
                      accept="image/*,.pdf"
                      :maxFileSize="1000000"
                      :auto="true"
                    >
                    </FileUpload>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="sponsored_by" class="col-sm-3 col-form-label">
                    <small>Dibiayai Oleh</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`nonformaleducations[${index}][sponsored_by]`"
                      v-model="nonformaleducate.sponsored_by"
                    />
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(nonformaleducation = false), (formaleducation = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(nonformaleducation = false), (computer = true)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="computer">
          <div class="card-header">
            Penguasaan Komputer dan Keahlian Khusus<span
              ><small
                ><i>(Computer Literate and Special Skills)</i></small
              ></span
            >
          </div>
          <div class="card-body">
            <Button
              @click="addComputer"
              icon="pi pi-plus"
              class="p-button-warning"
              v-tooltip.right="'Klik untuk menambahkan'"
            />
            <div v-for="(compute, index) in computers" :key="index">
              <div class="mt-2">
                <div class="row">
                  <label for="skill" class="col-sm-2 col-form-label">
                    <small>Jenis Program Aplikasi dan Keahlian Khusus</small
                    ><span style="color: red">*</span>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      v-model="compute.skill"
                      :rules="isRequired"
                      :name="`computers[${index}][skill]`"
                    />
                    <ErrorMessage :name="`computers[${index}][skill]`">
                      <small style="color: red">Skill is required</small>
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="level" class="col-sm-2 col-form-label">
                    <small>Tingkat Penguasaan</small
                    ><span style="color: red">*</span>
                  </label>
                  <div class="col-sm">
                    <Dropdown
                      v-model="compute.level"
                      :options="proficiens"
                      optionLabel="proficiens_name"
                      optionValue="code"
                      placeholder="Select a Proficiency"
                      :name="`computers[${index}][level]`"
                    />
                    <ErrorMessage :name="`computers[${index}][level]`">
                      <small style="color: red">Level is required</small>
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(computer = false), (nonformaleducation = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(computer = false), (employhistory = true)"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="employhistory">
          <div class="card-header">
            Riwayat Pekerjaan<span
              ><small
                ><i>
                  (Mulai dari pekerjaan pertama s/d pekerjaan terakhir)</i
                ></small
              ></span
            >
          </div>
          <div class="card-body">
            <Button
              @click="addhistory"
              icon="pi pi-plus"
              class="p-button-warning"
              v-tooltip.right="'Klik untuk menambahkan'"
            />
            <div
              v-for="(employmenthistory, index) in employmenthistories"
              :key="index"
            >
              <div class="mt-2">
                <div class="row">
                  <label for="start" class="col-sm-2 col-form-label">
                    <small>Bulan / Tahun Mulai</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`employmenthistories[${index}][start]`"
                      type="month"
                      v-model="employmenthistory.start"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="end" class="col-sm-2 col-form-label">
                    <small>Bulan / Tahun Selesai</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`employmenthistories[${index}][end]`"
                      type="month"
                      v-model="employmenthistory.end"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="name_company" class="col-sm-2 col-form-label">
                    <small>Nama Perusahaan</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`employmenthistories[${index}][name_company]`"
                      v-model="employmenthistory.name_company"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="position" class="col-sm-2 col-form-label">
                    <small>Jabatan</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`employmenthistories[${index}][position]`"
                      v-model="employmenthistory.position"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label
                    for="direct_supervisor"
                    class="col-sm-2 col-form-label"
                  >
                    <small>Atasan Langsung</small>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`employmenthistories[${index}][direct_supervisor]`"
                      v-model="employmenthistory.direct_supervisor"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="take_home_pay" class="col-sm-2 col-form-label">
                    <small>Total Gaji</small>
                  </label>
                  <div class="col-sm">
                    <InputNumber
                      mode="currency"
                      currency="IDR"
                      locale="id-ID"
                      v-model="employmenthistory.take_home_pay"
                      :name="`employmenthistories[${index}][take_home_pay]`"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="reason_leaving" class="col-sm-2 col-form-label">
                    <small>Alasan Keluar</small>
                  </label>
                  <div class="col-sm">
                    <textarea
                      class="form-control"
                      :name="`employmenthistories[${index}][reason_leaving]`"
                      v-model="employmenthistory.reason_leaving"
                    />
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(employhistory = false), (computer = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(employhistory = false), (jobdesc = true)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="jobdesc">
          <div class="card-header">
            Tugas dan Tanggung Jawab Pekerjaan<span
              ><small> <i> (Di tempat terakhir anda bekerja)</i></small></span
            >
          </div>
          <div class="card-body">
            <div class="mt-2">
              <div class="row">
                <label for="description" class="col-sm-2 col-form-label">
                  <small>Job Deskripsi</small>
                </label>
                <div class="col-sm">

                  <Textarea
                    v-model="jobdescription.description"
                    rows="15"
                    cols="115"
                  />
                  <!-- <textarea
                    class="form-control"
                    name="start"
                    v-model="jobdescription.description"
                    v-tooltip.top="'Gambarkan deskripsi pekerjaan terakhir'"

                  ></textarea> -->
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(jobdesc = false), (employhistory = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(jobdesc = false), (otherinfo = true)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="otherinfo">
          <div class="card-header">
            Keterangan Lainnya<span
              ><small><i> (Other Informations)</i></small></span
            >
          </div>
          <div class="card-body">
            <div class="mt-2">
              <label for="hospitalized">
                <small
                  >Apakah anda pernah dirawat di rumah sakit dan atau menderita
                  sakit yang lama ?
                </small>
                <span style="color: red">*</span>
              </label>
              <select
                v-model="otherinformation.hospitalized"
                class="form-control"
              >
                <option value="ya">Ya</option>
                <option value="tidak">Tidak</option>
              </select>
              <!-- <Field
              class="form-control"
              name="hospitalized"
              :rules="isRequired"
              v-model="otherinformation.hospitalized"
            />
            <ErrorMessage name="hospitalized">
              <small style="color: red">Hospitalized is required</small>
            </ErrorMessage> -->
            </div>
            <div class="mt-2" v-if="otherinformation.hospitalized === 'ya'">
              <label for="disease">
                <small>(Jika Ya) Sakit apa ? </small>
              </label>
              <Field
                class="form-control"
                name="disease"
                v-model="otherinformation.disease"
              />
              <label for="year">
                <small>Kapan ? </small>
              </label>
              <Field
                class="form-control"
                name="year"
                v-model="otherinformation.year"
              />
            </div>

            <div class="mt-2">
              <label for="psycological_test">
                <small
                  >Kapan terakhir anda mengikuti evaluasi psikologis (psikotest)
                  ?</small
                >
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="psycological_test"
                v-model="otherinformation.psycological_test"
                :rules="isRequired"
              />
              <ErrorMessage name="psycological_test">
                <small style="color: red">Psycological Test is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="experience_tellecomunication">
                <small
                  >Berapa lama pengalaman anda didalam area kerja industri
                  telekomunikasi ?
                </small>
              </label>
              <Field
                class="form-control"
                name="experience_tellecomunication"
                v-model="otherinformation.experience_tellecomunication"
              />
            </div>
            <div class="mt-2">
              <label for="experience_it">
                <small
                  >Berapa lama pengalaman anda didalam area kerja teknologi IT
                  ?</small
                >
              </label>
              <Field
                class="form-control"
                name="experience_it"
                v-model="otherinformation.experience_it"
              />
            </div>
            <div class="mt-2">
              <label for="reason_join">
                <small
                  >Sebutkan alasan anda ingin bergabung dengan PT Imani Prima?
                </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="reason_join"
                v-model="otherinformation.reason_join"
                :rules="isRequired"
              />
              <ErrorMessage name="reason_join">
                <small style="color: red">Reason Join is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="reason_hire">
                <small>Mengapa kami bisa mempekerjakan anda? </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="reason_hire"
                v-model="otherinformation.reason_hire"
                :rules="isRequired"
              />
              <ErrorMessage name="reason_hire">
                <small style="color: red">Reason Hire is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="opinion_teamwork">
                <small
                  >Informasikan pendapat anda tentang Kerjasama (Team Work)
                  ?</small
                >
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="opinion_teamwork"
                v-model="otherinformation.opinion_teamwork"
                :rules="isRequired"
              />
              <ErrorMessage name="opinion_teamwork">
                <small style="color: red"
                  >Opinion About Teamwork is required</small
                >
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="plan">
                <small
                  >Sebutkan rencana jangka pendek dan rencana jangka panjang
                  anda?</small
                >
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="plan"
                v-model="otherinformation.plan"
                :rules="isRequired"
              />
              <ErrorMessage name="plan">
                <small style="color: red">Plan is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="respond_target">
                <small
                  >Bagaimana tanggapan anda mengenai target yang akan diberikan
                  oleh perusahaan kepada anda?
                </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="respond_target"
                v-model="otherinformation.respond_target"
                :rules="isRequired"
              />
              <ErrorMessage name="respond_target">
                <small style="color: red"
                  >Respond about target is required</small
                >
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="respond_preasure">
                <small
                  >Bagaimana tanggapan anda mengenai tekanan dalam pekerjaan?
                </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="respond_preasure"
                v-model="otherinformation.respond_preasure"
                :rules="isRequired"
              />
              <ErrorMessage name="respond_preasure">
                <small style="color: red"
                  >Respond about preasure is required</small
                >
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="reason_leave_last_company">
                <small
                  >Mengapa anda ingin keluar dari perusahaan terakhir ?
                </small>
              </label>
              <Field
                class="form-control"
                name="reason_leave_last_company"
                v-model="otherinformation.reason_leave_last_company"
              />
            </div>
            <div class="mt-2">
              <label for="salary_expect">
                <small>Berapa gaji yang anda inginkan ? </small>
                <span style="color: red">*</span>
              </label>
              <InputNumber
                mode="currency"
                currency="IDR"
                locale="id-ID"
                v-model="otherinformation.salary_expect"
                name="salary_expect"
                :rules="isRequired"
                style="width: 100%"
              />
            </div>
            <div class="mt-2">
              <label for="able_to_start">
                <small>Kapan anda dapat mulai bekerja ? </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="able_to_start"
                v-model="otherinformation.able_to_start"
                :rules="isRequired"
              />
              <ErrorMessage name="able_to_start">
                <small style="color: red">Able to start is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="contact_emergency">
                <small
                  >Sebutkan orang terdekat yang bisa dihubungi dalam keadaan
                  darurat ?
                </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="contact_emergency"
                v-model="otherinformation.contact_emergency"
                :rules="isRequired"
                v-tooltip.top="'Hubungan - Telpon'"
              />
              <ErrorMessage name="contact_emergency">
                <small style="color: red">Contact Emergency is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="relatives_in_ip">
                <small
                  >Sebutkan nama kenalan anda di PT. Imani Prima dan hubungan
                  anda dengannya sebagai ?
                </small>
              </label>
              <Field
                class="form-control"
                name="relatives_in_ip"
                v-model="otherinformation.relatives_in_ip"
                v-tooltip.top="'Nama Kenalan - Hubungan'"
              />
            </div>
            <div class="mt-2">
              <label for="strength">
                <small
                  >Menurut anda apa kelebihan pada diri anda ? Sebutkan
                  masing-masing 3 item.
                </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="strength"
                v-model="otherinformation.strength"
                :rules="isRequired"
                v-tooltip.top="'Batasi dengan ( , )'"
              />
              <ErrorMessage name="strength">
                <small style="color: red">Strength is required</small>
              </ErrorMessage>
            </div>
            <div class="mt-2">
              <label for="weakness">
                <small
                  >Menurut anda apa kekurangan pada diri anda ? Sebutkan
                  masing-masing 3 item.
                </small>
                <span style="color: red">*</span>
              </label>
              <Field
                class="form-control"
                name="weakness"
                v-model="otherinformation.weakness"
                :rules="isRequired"
                v-tooltip.top="'Batasi dengan ( , )'"
              />
              <ErrorMessage name="weakness">
                <small style="color: red">Weakness is required</small>
              </ErrorMessage>
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(otherinfo = false), (jobdesc = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-right"
              @click="(otherinfo = false), (attach = true)"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>

        <div v-if="attach">
          <div class="card-header">
            Berkas<span
              ><small><i> (Attachments)</i></small></span
            >
          </div>
          <div class="card-body">
            <Button
              @click="addAttachment"
              icon="pi pi-plus"
              class="p-button-warning"
              v-tooltip.right="'Klik untuk menambahkan'"
            />
            <div v-for="(attachment, index) in attachments" :key="index">
              <div class="mt-2">
                <div class="row">
                  <label for="type" class="col-sm-2 col-form-label">
                    <small>Jenis File</small><span style="color: red">*</span>
                  </label>
                  <div class="col-sm">
                    <Field
                      class="form-control"
                      :name="`attachments[${index}][type]`"
                      :rules="isRequired"
                      v-model="attachment.type"
                    />
                    <ErrorMessage :name="`attachments[${index}][type]`">
                      <small style="color: red">Type is required</small>
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="row">
                  <label for="file" class="col-sm-2 col-form-label">
                    <small>File</small>
                  </label>
                  <div class="col-sm">
                    <FileUpload
                      name="demo[]"
                      mode="basic"
                      @upload="onUpload($event, index)"
                      accept="image/*,.pdf"
                      :maxFileSize="1000000"
                      :auto="true"
                    >
                    </FileUpload>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </div>
          <div class="card-footer text-muted">
            <Button
              class="p-button-sm"
              icon="pi pi-arrow-left"
              @click="(attach = false), (otherinfo = true)"
            />
            <Button
              class="p-button-sm"
              icon="pi pi-save"
              type="submit"
              :loading="loading"
              :disabled="!(meta.valid && meta.dirty)"
              style="float: right"
            />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
definePageMeta({
  layout: false,
});

const displayModal = ref(false);
const openModal = () => {
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};

const toast = useToast();

const jobs = ref([]);
const config = useRuntimeConfig();
onMounted(async () => {
  getJob();
  await getProvinsi();
});

const showWarn = () => {
  toast.add({
    severity: "warn",
    summary: "Sukses isi Form",
    detail: "Form Anda Lengkap, Silahkan tunggu halaman selanjutnya",
    life: 3000,
  });
};

function getJob() {
  try {
    axios.get(config.API_BASE_URL + "jobs").then((response) => {
      jobs.value = response.data.data;
    });
  } catch (err) {
    console.log(err);
  }
}

const computers = reactive([
  {
    skill: "",
    level: "",
  },
]);
function addComputer() {
  computers.push({
    skill: "",
    level: "",
  });
}

const families = reactive([]);
const fams = ref({
  member: "",
  name: "",
  gender: "",
  date: "",
  education: "",
  occupation_company: "",
});
function addFamily() {
  families.push({
    member: fams.value.member,
    name: fams.value.name,
    gender: fams.value.gender,
    date: fams.value.date,
    education: fams.value.education,
    occupation_company: fams.value.occupation_company,
  });
  fams.value = {
    member: "",
    name: "",
    gender: "",
    date: "",
    education: "",
    occupation_company: "",
  };
  closeModal();
}
const popIndex = (index) => {
  families.splice(index, 1);
};

const nonformaleducations = reactive([]);
function addnonFormal() {
  nonformaleducations.push({
    course: "",
    year: "",
    duration: "",
    certificate: "",
    sponsored_by: "",
  });
}

const employmenthistories = reactive([]);
function addhistory() {
  employmenthistories.push({
    start: "",
    end: "",
    name_company: "",
    position: "",
    direct_supervisor: "",
    take_home_pay: "",
    reason_leaving: "",
  });
}

const attachments = reactive([
  {
    type: "KTP",
    file: "",
  },
  {
    type: "Ijazah",
    file: "",
  },
  {
    type: "Transkip Nilai",
    file: "",
  },
]);
function addAttachment() {
  attachments.push({
    type: "",
    file: "",
  });
}

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
  phone: "",
  mobile: "",
  office_parent_phone: "",
  email: "",
  id_sim_no: "",
  valid_to: "",
  npwp_no: "",
  account_no: "",
  religion: "",
  JobId: "",
  photo: "",
  marital_status: "",
  year_marriage: "",
});

const members = ref([
  { member_name: "Ayah", code: "Ayah" },
  { member_name: "Ibu", code: "Ibu" },
  { member_name: "Saudara 1", code: "Saudara 1" },
  { member_name: "Saudara 2", code: "Saudara 2" },
  { member_name: "Saudara 3", code: "Saudara 3" },
  { member_name: "Suami / Istri", code: "Suami / Istri" },
  { member_name: "Anak 1", code: "Anak 1" },
  { member_name: "Anak 2", code: "Anak 2" },
  { member_name: "Anak 3", code: "Anak 3" },
]);

const formaleducate = reactive({
  level: "",
  name_location: "",
  location: "",
  major: "",
  gpa: "",
  entry: "",
  graduate: "",
  ip_rata: "",
});

const levels = ref([
  { level_name: "Pasca Sarjana (S2)", code: "S2" },
  { level_name: "Sarjana (S1)", code: "S1" },
  { level_name: "Akademi (D3)", code: "D3" },
  { level_name: "SMU", code: "SMU" },
]);

const computerliterate = reactive({
  skill: "",
  level: "",
});

const proficiens = ref([
  { proficiens_name: "Baik", code: "baik" },
  { proficiens_name: "Cukup", code: "cukup" },
  { proficiens_name: "Kurang", code: "kurang" },
]);

const jobdescription = reactive({
  description: "",
});

const otherinformation = reactive({
  hospitalized: "",
  disease: "",
  year: "",
  psycological_test: "",
  experience_tellecomunication: "",
  experience_it: "",
  reason_join: "",
  reason_hire: "",
  opinion_teamwork: "",
  plan: "",
  respond_target: "",
  respond_preasure: "",
  reason_leave_last_company: "",
  salary_expect: "",
  able_to_start: "",
  contact_emergency: "",
  relatives_in_ip: "",
  strength: "",
  weakness: "",
});
let apply = ref(true);
let personal1 = ref(false);
let personal2 = ref(false);
let family = ref(false);
let formaleducation = ref(false);
let nonformaleducation = ref(false);
let computer = ref(false);
let employhistory = ref(false);
let jobdesc = ref(false);
let otherinfo = ref(false);
let attach = ref(false);
let technicalskill = ref(false);
const loading = ref(false);

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

async function save() {
  if (applicant.value.photo === null)
    return (applicant.value.photo =
      "https://via.placeholder.com/120x120?text=FOTO");
  try {
    await axios
      .post(config.API_BASE_URL + "applicants", {
        applicant: {
          name: applicant.value.name,
          gender: applicant.value.gender,
          place_of_birth: applicant.value.place_of_birth,
          date: applicant.value.date,
          blood_type: applicant.value.blood_type,
          province: applicant.value.province ? applicant.value.province[1] : "",
          city: applicant.value.city ? applicant.value.city[1] : "",
          district: applicant.value.district ? applicant.value.district[1] : "",
          subdistrict: applicant.value.subdistrict
            ? applicant.value.subdistrict[1]
            : "",
          address: applicant.value.address,
          postal_code_address: applicant.value.postal_code_address,
          province_dom: applicant.value.province_dom
            ? applicant.value.province_dom[1]
            : "",
          city_dom: applicant.value.city_dom ? applicant.value.city_dom[1] : "",
          district_dom: applicant.value.district_dom
            ? applicant.value.district_dom[1]
            : "",
          subdistrict_dom: applicant.value.subdistrict_dom
            ? applicant.value.subdistrict_dom[1]
            : "",
          domicile: applicant.value.domicile,
          postal_code_domicile: applicant.value.postal_code_domicile,
          phone: applicant.value.phone,
          mobile: applicant.value.mobile,
          office_parent_phone: applicant.value.office_parent_phone,
          email: applicant.value.email,
          id_sim_no: applicant.value.id_sim_no,
          valid_to: applicant.value.valid_to,
          npwp_no: applicant.value.npwp_no,
          account_no: applicant.value.account_no,
          religion: applicant.value.religion,
          JobId: applicant.value.JobId,
          photo: applicant.value.photo,
          marital_status: applicant.value.marital_status,
          year_marriage: applicant.value.year_marriage,
          status: "shortlisted",
          isCandidate: 0,
        },
        family: families,
        formaleducation: {
          level: formaleducate.level,
          name_location: formaleducate.name_location,
          location: formaleducate.location,
          major: formaleducate.major,
          gpa: formaleducate.gpa,
          entry: formaleducate.entry,
          graduate: formaleducate.graduate,
          ip_rata: formaleducate.ip_rata,
        },
        nonformaleducation: nonformaleducations,
        computerliterate: computers,
        employmenthistory: employmenthistories,
        jobdescription: {
          description: jobdescription.description,
        },
        otherinformation: {
          hospitalized: otherinformation.hospitalized,
          disease: otherinformation.disease,
          year: otherinformation.year,
          psycological_test: otherinformation.psycological_test,
          experience_tellecomunication:
            otherinformation.experience_tellecomunication,
          experience_it: otherinformation.experience_it,
          reason_join: otherinformation.reason_join,
          reason_hire: otherinformation.reason_hire,
          opinion_teamwork: otherinformation.opinion_teamwork,
          plan: otherinformation.plan,
          respond_target: otherinformation.respond_target,
          respond_preasure: otherinformation.respond_preasure,
          reason_leave_last_company: otherinformation.reason_leave_last_company,
          salary_expect: otherinformation.salary_expect,
          able_to_start: otherinformation.able_to_start,
          contact_emergency: otherinformation.contact_emergency,
          relatives_in_ip: otherinformation.relatives_in_ip,
          strength: otherinformation.strength,
          weakness: otherinformation.weakness,
        },
        attachment: attachments,
      })
      .then((response) => {
        showWarn();
        loading.value = true;
      });
    const applicantNow = await axios.get(config.API_BASE_URL + "applicants");
    const pdf = await axios.get(
      config.API_BASE_URL + "topdf/" + applicantNow.data.data[0].id
    );
    loading.value = false;
    setTimeout(() => {
      router.push({
        path: "/formapplication/technicalskill/" + applicantNow.data.data[0].id,
      });
    }, 1000);
  } catch (err) {
    console.log(err);
  }
}
const router = useRouter();
const onUploadAva = (evt) => {
  let f = evt.files[0];
  // newAttachment.type = f.type;
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onloadend = function () {
    applicant.value.photo = reader.result;
  };
};
const onUpload = (evt, index) => {
  try {
    let f = evt.files[0];
    // attachments[index].type = f.type;
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = function () {
      attachments[index].file = reader.result;
    };
    // alert("File Uploaded");
    toast.add({ severity: "success", summary: "File Uploaded", life: 3000 });
  } catch (err) {
    alert(err);
  }
};

const onUploadCerti = (evt, index) => {
  try {
    let f = evt.files[0];
    // attachments[index].type = f.type;
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = function () {
      nonformaleducations[index].certificate = reader.result;
    };
    // alert("File Uploaded");
    toast.add({ severity: "success", summary: "File Uploaded", life: 3000 });
  } catch (err) {
    alert(err);
  }
};

const EXT_API_URL = "https://dev.farizdotid.com/api/daerahindonesia/";
const dataProvinsi = ref([]);
const dataKotaKab = ref([]);
const dataKecamatan = ref([]);
const dataDesaKel = ref([]);

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
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";

.card {
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 20px;
}
</style>
