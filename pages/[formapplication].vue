<template>
  <div class="card">
    <Form v-slot="{ meta }" @submit="save">
      <Toast />
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
              <Field
                class="form-control"
                name="position"
                :rules="isRequired"
                v-model="applicant.position"
              />
              <ErrorMessage name="position">
                <small style="color: red">Apply for Position is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <Button class="p-button-sm p-button-text" disabled />
        <Button
          class="p-button-sm"
          icon="pi pi-arrow-right"
          @click="(apply = false), (personal1 = true)"
          :disabled="!(meta.valid && meta.dirty)"
          style="float: right;"
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

        <div class="mt-2">
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
              <small>No. KTP/SIM</small><span style="color: red">*</span>
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
              />&nbsp;
              <label for="religion" class="col-form-label"
                ><small>Islam</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="religion"
                value="katholik"
                :rules="isRequired"
                v-model="applicant.religion"
              />&nbsp;
              <label for="religion" class="col-form-label"
                ><small>Katholik</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="religion"
                value="protestan"
                :rules="isRequired"
                v-model="applicant.religion"
              />&nbsp;
              <label for="religion" class="col-form-label"
                ><small>Protestan</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="religion"
                value="budha"
                :rules="isRequired"
                v-model="applicant.religion"
              />&nbsp;
              <label for="religion" class="col-form-label"
                ><small>Budha</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="religion"
                value="hindu"
                :rules="isRequired"
                v-model="applicant.religion"
              />&nbsp;
              <label for="religion" class="col-form-label"
                ><small>Hindu</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field
                type="radio"
                name="religion"
                value="lainnya"
                :rules="isRequired"
                v-model="applicant.religion"
              />&nbsp;
              <label for="religion" class="col-form-label"
                ><small>Lainnya</small></label
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
          style="float: right;"
        />
      </div>
    </div>

    <div v-if="personal2">
      <div class="card-header">
        Data Pribadi&nbsp;<span><small>(Personal Data)</small></span>
      </div>
      <div class="card-body">
        <div class="mt-2">
          <div class="row">
            <label for="address" class="col-sm-2 col-form-label">
              <small>Alamat Rumah (sesuai KTP)</small
              ><span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="address"
                :rules="isRequired"
                v-model="applicant.address"
              />
              <ErrorMessage name="address">
                <small style="color: red">Address is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label for="postal_code_address" class="col-sm-2 col-form-label">
              <small>Kode Pos</small><span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="postal_code_address"
                :rules="isRequired"
                v-model="applicant.postal_code_address"
              />
              <ErrorMessage name="postal_code_address">
                <small style="color: red">Postal Code Addess is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="row">
            <label for="domicile" class="col-sm-2 col-form-label">
              <small>Alamat Rumah (Domisili)</small>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="domicile"
                v-model="applicant.domicile"
              />
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="row">
            <label for="postal_code_domicile" class="col-sm-2 col-form-label">
              <small>Kode Pos (Domisili)</small>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="postal_code_domicile"
                v-model="applicant.postal_code_domicile"
              />
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="row">
            <label for="phome" class="col-sm-2 col-form-label">
              <small>Telpon</small>
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="phome"
                v-model="applicant.phone"
              />
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="row">
            <label for="office_parent_phone" class="col-sm-2 col-form-label">
              <small>Telpon Kantor/Orang Tua</small>
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

        <div class="mt-2">
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

        <div class="mt-2">
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
          style="float: right;"
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
            <label for="marital_status" class="col-sm-2 col-form-label">
              <small>Status Perkawinan</small><span style="color: red">*</span>
            </label>
            <div class="col-sm">
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
          @click="addFamily"
          icon="pi pi-plus"
          class="p-button-warning"
          v-tooltip.right="'Klik untuk menambahkan'"
        />
        <div v-for="(fams, index) in families" :key="index">
          <div class="mt-2">
            <div class="row">
              <label for="member" class="col-sm-2 col-form-label">
                <small>Anggota Keluarga</small><span style="color: red">*</span>
              </label>
              <div class="col-sm">
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
              <label for="fams_name" class="col-sm-2 col-form-label">
                <small>Nama</small><span style="color: red">*</span>
              </label>
              <div class="col-sm">
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
              <label for="fams_gender" class="col-sm-2 col-form-label">
                <small>Jenis Kelamin</small><span style="color: red">*</span>
              </label>
              <div class="col-sm">
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
              <label for="fams_date" class="col-sm-2 col-form-label">
                <small>Tanggal Lahir</small><span style="color: red">*</span>
              </label>
              <div class="col-sm">
                <Field
                  class="form-control"
                  type="date"
                  :name="`families[${index}][date]`"
                  :rules="isRequired"
                  v-model="fams.date"
                />
                <ErrorMessage :name="`families[${index}][date]`">
                  <small style="color: red">Date of Birth is required</small>
                </ErrorMessage>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="row">
              <label for="education" class="col-sm-2 col-form-label">
                <small>Pendidikan</small>
              </label>
              <div class="col-sm">
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
              <label for="occupation_company" class="col-sm-2 col-form-label">
                <small>Pekerjaan & Perusahaan</small>
              </label>
              <div class="col-sm">
                <Field
                  class="form-control"
                  :name="`families[${index}][occupation_company]`"
                  v-model="fams.occupation_company"
                  v-tooltip.top="'Pekerjaan - Perusahaan'"
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
          @click="(family = false), (personal2 = true)"
        />
        <Button
          class="p-button-sm"
          icon="pi pi-arrow-right"
          @click="(family = false), (formaleducation = true)"
          :disabled="!(meta.valid && meta.dirty)"
          style="float: right;"
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
            <label for="level" class="col-sm-2 col-form-label">
              <small>Level</small><span style="color: red">*</span>
            </label>
            <div class="col-sm">
              <Dropdown
                v-model="formaleducate.level"
                :options="levels"
                optionLabel="level_name"
                optionValue="code"
                placeholder="Select a Level" />
              <ErrorMessage name="level">
                <small style="color: red">Education is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label for="name_location" class="col-sm-2 col-form-label">
              <small>Nama & Lokasi / Tempat</small
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
                <small style="color: red">Name & Location is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="row">
            <label for="major" class="col-sm-2 col-form-label">
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
            <label for="graduate" class="col-sm-2 col-form-label">
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
          style="float: right;"
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
              <label for="course" class="col-sm-2 col-form-label">
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
              <label for="year" class="col-sm-2 col-form-label">
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
              <label for="duration" class="col-sm-2 col-form-label">
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
              <label for="certificate" class="col-sm-2 col-form-label">
                <small>Sertifikat</small>
              </label>
              <div class="col-sm">
                <FileUpload
                  name="demo[]"
                  mode="basic"
                  @upload="onUploadCerti($event, index)"
                  accept="image/*,.pdf"
                  :maxFileSize="1000000"
                >
                </FileUpload>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="row">
              <label for="sponsored_by" class="col-sm-2 col-form-label">
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
          :disabled="!(meta.valid && meta.dirty)"
          style="float: right;"
        />
      </div>
    </div>

    <div v-if="computer">
      <div class="card-header">
        Penguasaan Komputer dan Keahlian Khusus<span
          ><small><i>(Computer Literate and Special Skills)</i></small></span
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
          style="float: right;"
        />
      </div>
    </div>

    <div v-if="employhistory">
        <div class="card-header">
            Riwayat Pekerjaan<span><small><i> (Mulai dari pekerjaan terakhir)</i></small></span>
        </div>
        <div class="card-body">
            <Button @click="addhistory" icon="pi pi-plus" class="p-button-warning" v-tooltip.right="'Klik untuk menambahkan'" />
        <div v-for="(employmenthistory, index) in employmenthistories" :key="index">
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
                  v-model="employmenthistory.start" />
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
                  v-model="employmenthistory.end" />
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
                  v-model="employmenthistory.name_company" />
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
                  v-model="employmenthistory.position" />
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="row">
              <label for="direct_supervisor" class="col-sm-2 col-form-label">
                <small>Atasan Langsung</small>
              </label>
              <div class="col-sm">
                <Field
                  class="form-control"
                  :name="`employmenthistories[${index}][direct_supervisor]`"
                  v-model="employmenthistory.direct_supervisor" />
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
                  style="width:100%;" />
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
                  v-model="employmenthistory.reason_leaving" />
              </div>
            </div>
          </div>
          <Divider />
        </div>
        
        </div>
        <div class="card-footer text-muted">
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(employhistory = false), (computer = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(employhistory = false), (jobdesc = true)"
          :disabled="!(meta.valid && meta.dirty)" style="float: right;" />
        </div>
    </div>

    <div v-if="jobdesc">
        <div class="card-header">
            Tugas dan Tanggung Jawab Pekerjaan<span><small> <i> (Di tempat terakhir anda bekerja)</i></small></span>
        </div>
        <div class="card-body">
            <div class="mt-2">
          <div class="row">
            <label for="description" class="col-sm-2 col-form-label">
              <small>Job Deskripsi</small>
            </label>
            <div class="col-sm">
              <textarea class="form-control" name="start" v-model="jobdescription.description" v-tooltip.top="'Gambarkan deskripsi pekerjaan terakhir'"></textarea>
            </div>
          </div>
        </div>
        </div>
        <div class="card-footer text-muted">
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(jobdesc = false), (employhistory = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(jobdesc = false), (otherinfo = true)" 
          :disabled="!(meta.valid && meta.dirty)" style="float: right;" />
        </div>
    </div>

    <div v-if="otherinfo">
        <div class="card-header">
            Keterangan Lainnya<span><small><i> (Other Informations)</i></small></span>
        </div>
        <div class="card-body">
            <div class="mt-2">
          <label for="hospitalized">
            <small>Apakah anda pernah dirawat di rumah sakit dan atau menderita sakit yang lama ? 
              Have you been hospitalized and / or seriouslyill for a long time?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="hospitalized"
            :rules="isRequired"
            v-model="otherinformation.hospitalized" />
          <ErrorMessage name="hospitalized">
            <small style="color: red">Hospitalized is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="disease">
            <small>(Jika Ya) Sakit apa ? (If Yes) What kind of disease ?</small>
          </label>
          <Field
            class="form-control"
            name="disease"
            v-model="otherinformation.disease" />
        </div>
        <div class="mt-2">
          <label for="psycological_test">
            <small>Kapan terakhir anda mengikuti evaluasi psikologis (psikotest) ?
              When t you taken a psycological test ?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="psycological_test"
            v-model="otherinformation.psycological_test" 
            :rules="isRequired" />
            <ErrorMessage name="psycological_test">
              <small style="color: red">Psycological Test is required</small>
            </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="experience_tellecomunication">
            <small>Berapa lama pengalaman anda didalam area kerja industri telekomunikasi ? 
              How long have your experience in the work area telecommunication industry?</small>
          </label>
          <Field
            class="form-control"
            name="experience_tellecomunication"
            v-model="otherinformation.experience_tellecomunication" />
        </div>
        <div class="mt-2">
          <label for="experience_it">
            <small>Berapa lama pengalaman anda didalam area kerja teknologi IT ? 
              How long have your experience in the work area IT Technology?</small>
          </label>
          <Field
            class="form-control"
            name="experience_it"
            v-model="otherinformation.experience_it" />
        </div>
        <div class="mt-2">
          <label for="reason_join">
            <small>Sebutkan alasan anda ingin bergabung dengan PT Imani Prima? 
              Why do you want to join with PT Imani Prima?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="reason_join"
            v-model="otherinformation.reason_join"
            :rules="isRequired" />
          <ErrorMessage name="reason_join">
            <small style="color: red">Reason Join is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="reason_hire">
            <small>Mengapa kami bisa mempekerjakan anda? Why we can hire you?</small>
            <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="reason_hire"
            v-model="otherinformation.reason_hire"
            :rules="isRequired" />
          <ErrorMessage name="reason_hire">
            <small style="color: red">Reason Hire is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="opinion_teamwork">
            <small>Informasikan pendapat anda tentang Kerjasama (Team Work) ? 
              Inform your opinion about team work?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="opinion_teamwork"
            v-model="otherinformation.opinion_teamwork"
            :rules="isRequired" />
          <ErrorMessage name="opinion_teamwork">
            <small style="color: red">Opinion About Teamwork is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="plan">
            <small>Sebutkan rencana jangka pendek dan rencana jangka panjang anda?
              Mention your short term plan and your long term plan?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="plan"
            v-model="otherinformation.plan"
            :rules="isRequired" />
          <ErrorMessage name="plan">
            <small style="color: red">Plan is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="respond_target">
            <small>Bagaimana tanggapan anda mengenai target yang akan diberikan oleh perusahaan kepada anda? 
              How do your respond to the target will company will give you?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="respond_target"
            v-model="otherinformation.respond_target"
            :rules="isRequired" />
          <ErrorMessage name="respond_target">
            <small style="color: red">Respond about target is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="respond_preasure">
            <small>Bagaimana tanggapan anda mengenai tekanan dalam pekerjaan? 
              How do your respond to pressure at work?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="respond_preasure"
            v-model="otherinformation.respond_preasure"
            :rules="isRequired" />
          <ErrorMessage name="respond_preasure">
            <small style="color: red">Respond about preasure is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="reason_leave_last_company">
            <small>Mengapa anda ingin keluar dari perusahaan terakhir ? 
              Why do you want to leave the last company?</small>
          </label>
          <Field
            class="form-control"
            name="reason_leave_last_company"
            v-model="otherinformation.reason_leave_last_company" />
        </div>
        <div class="mt-2">
          <label for="salary_expect">
            <small>Berapa gaji yang anda inginkan ? How much salary do you expect ?</small>
            <span style="color: red">*</span>
          </label>
          <InputNumber 
            mode="currency" 
            currency="IDR" 
            locale="id-ID"
            v-model="otherinformation.salary_expect"
            name="salary_expect"
            :rules="isRequired"
            style="width:100%;" />
        </div>
        <div class="mt-2">
          <label for="able_to_start">
            <small>Kapan anda dapat mulai bekerja ? When will you be able to start to work ?</small>
            <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="able_to_start"
            v-model="otherinformation.able_to_start"
            :rules="isRequired" />
          <ErrorMessage name="able_to_start">
            <small style="color: red">Able to start is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="contact_emergency">
            <small>Sebutkan orang terdekat yang bisa dihubungi dalam keadaan darurat ? 
              Person to contact in case of emergency?</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="contact_emergency"
            v-model="otherinformation.contact_emergency"
            :rules="isRequired"
            v-tooltip.top="'Hubungan - Telpon'" />
          <ErrorMessage name="contact_emergency">
            <small style="color: red">Contact Emergency is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="relatives_in_ip">
            <small>Sebutkan nama kenalan anda di PT. Imani Prima dan hubungan anda dengannya sebagai ? 
              Name your friends / relatives in PT. Imani Prima and the relationship as ? </small>
          </label>
          <Field
            class="form-control"
            name="relatives_in_ip"
            v-model="otherinformation.relatives_in_ip"
            v-tooltip.top="'Nama Kenalan - Hubungan'" />
        </div>
        <div class="mt-2">
          <label for="strength">
            <small>Menurut anda apa kelebihan pada diri anda ? Sebutkan masing-masing 3 item. 
              What do you think is your strengths ? Please state 3 items.</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="strength"
            v-model="otherinformation.strength"
            :rules="isRequired"
            v-tooltip.top="'Batasi dengan ( , )'" />
          <ErrorMessage name="strength">
            <small style="color: red">Strength is required</small>
          </ErrorMessage>
        </div>
        <div class="mt-2">
          <label for="weakness">
            <small>Menurut anda apa kekurangan pada diri anda ? Sebutkan masing-masing 3 item. 
              What do you think is your weaknesses ? Please state 3 items.</small>
              <span style="color: red">*</span>
          </label>
          <Field
            class="form-control"
            name="weakness"
            v-model="otherinformation.weakness"
            :rules="isRequired"
            v-tooltip.top="'Batasi dengan ( , )'" />
            <ErrorMessage name="weakness">
            <small style="color: red">Weakness is required</small>
          </ErrorMessage>
        </div>
        </div>
        <div class="card-footer text-muted">
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(otherinfo = false), (jobdesc = true)" />
          <Button class="p-button-sm" icon="pi pi-arrow-right" @click="(otherinfo = false), (attach = true)" 
          :disabled="!(meta.valid && meta.dirty)" style="float: right;" />
        </div>
    </div>

    <div v-if="attach">
        <div class="card-header">
            Berkas<span><small><i> (Attachments)</i></small></span >
        </div>
        <div class="card-body">
            <Button @click="addAttachment" icon="pi pi-plus" class="p-button-warning" v-tooltip.right="'Klik untuk menambahkan'" />
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
                  v-model="attachment.type" />
                <ErrorMessage :name="`attachments[${index}][type]`">
                  <small style="color: red">Type is required</small>
                </ErrorMessage>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <Toast />
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
                  :maxFileSize="1000000" >
                </FileUpload>
              </div>
            </div>
          </div>
          <Divider />
        </div>
        </div>
        <div class="card-footer text-muted">
          <Button class="p-button-sm" icon="pi pi-arrow-left" @click="(attach = false), (otherinfo = true)" />
          <Button class="p-button-sm" type="submit" icon="pi pi-save" :disabled="!(meta.valid && meta.dirty)" style="float: right;" />
        </div>
    </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const computers = reactive([
  {
    skill: "",
    level: "",
  }
]);
function addComputer() {
  computers.push({
    skill: "",
    level: "",
  });
}

const families = reactive([
  {
    member: "",
    name: "",
    gender: "",
    date: "",
    education: "",
    occupation_company: "",
  }
]);
function addFamily() {
  families.push({
    member: "",
    name: "",
    gender: "",
    date: "",
    education: "",
    occupation_company: "",
  });
}

const nonformaleducations = reactive([
]);
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
    type: 'KTP',
    file: "",
  },
  {
    type: 'Ijazah',
    file: "",
  },
  {
    type: 'Transkip Nilai',
    file: "",
  },
]);
function addAttachment() {
  attachments.push({
    type: "",
    file: "",
  });
}

const applicant = reactive({
  name: "",
  gender: "",
  place_of_birth: "",
  date: "",
  blood_type: "",
  address: "",
  postal_code_address: "",
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
  position: "",
  photo: "",
  marital_status: "",
  year_marriage: "",
});

const members = ref([
  { member_name: "Ayah", code: "ayah" },
  { member_name: "Ibu", code: "ibu" },
  { member_name: "Saudara 1", code: "saudara1" },
  { member_name: "Saudara 2", code: "saudara2" },
  { member_name: "Saudara 3", code: "saudara3" },
  { member_name: "Suami / Istri", code: "suami/istri" },
  { member_name: "Anak 1", code: "anak1" },
  { member_name: "Anak 2", code: "anak2" },
  { member_name: "Anak 3", code: "anak3" },
]);

const formaleducate = reactive({
  level: "",
  name_location: "",
  major: "",
  entry: "",
  graduate: "",
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

const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

async function save() {
  if (applicant.photo === null)
    return (applicant.photo = "https://via.placeholder.com/120x120?text=FOTO");
  try {
    await axios
      .post("http://localhost:3000/api/1.0/applicants", {
        applicant: {
          name: applicant.name,
          gender: applicant.gender,
          place_of_birth: applicant.place_of_birth,
          date: applicant.date,
          blood_type: applicant.blood_type,
          address: applicant.address,
          postal_code_address: applicant.postal_code_address,
          domicile: applicant.domicile,
          postal_code_domicile: applicant.postal_code_domicile,
          phone: applicant.phone,
          mobile: applicant.mobile,
          office_parent_phone: applicant.office_parent_phone,
          email: applicant.email,
          id_sim_no: applicant.id_sim_no,
          valid_to: applicant.valid_to,
          npwp_no: applicant.npwp_no,
          account_no: applicant.account_no,
          religion: applicant.religion,
          position: applicant.position,
          photo: applicant.photo,
          marital_status: applicant.marital_status,
          year_marriage: applicant.year_marriage,
        },
        family: families,
        formaleducation: {
          level: formaleducate.level,
          name_location: formaleducate.name_location,
          major: formaleducate.major,
          entry: formaleducate.entry,
          graduate: formaleducate.graduate,
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
        toast.add({ severity: "info", summary: "Success Save Data" });
        setTimeout(function () {
          location.reload();
        }, 1000);
      });
  } catch (err) {
    console.log(err);
  }
}

const onUploadAva = (evt) => {
  let f = evt.files[0];
  // newAttachment.type = f.type;
  const reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onloadend = function () {
    applicant.photo = reader.result;
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
    alert("File Uploaded");
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
    alert("File Uploaded");
  } catch (err) {
    alert(err);
  }
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";
.card{
    margin-left: 90px;
    margin-right: 90px;
    margin-top: 15px;
}
/* .p-button-sm{
    margin-left: 400px;
} */



</style>
