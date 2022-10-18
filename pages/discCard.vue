<template>
    <div class="box">
        <h3>DISC Personality Test</h3>
        <Message>
            <h4>INSTRUKSI</h4>
            Setiap nomor di bawah ini memuat 4 (empat) kalimat. Tugas anda adalah : <br />
            1. Beri tanda/cek pada kolom di bawah huruf [P] di samping kalimat yang PALING menggambarkan diri
            anda
            <br />
            2. Beri tanda/cek pada kolom di bawah huruf [K] di samping kalimat yang PALING TIDAK menggambarkan
            diri
            anda
        </Message>
        <Toast />
        <div class="col-md">
            <!-- <form @submit.prevent="save"> -->
                <Form v-slot="{ meta }" class="card" @submit="save">
                <div v-if="isTerisi">
                        <div class="form-group">
                            <label for="name">Name<span style="color:red;">*</span></label>
                            <Field class="form-control" name="name" :rules="isRequired" v-model="answer.name" />
                            <ErrorMessage name="name"><small style="color:red;">Name is required</small></ErrorMessage>
                        </div>
                        <div class="form-group">
                            <label for="email">Email<span style="color:red;">*</span></label>
                            <Field class="form-control" name="email" :rules="isRequired" v-model="answer.email" />
                            <ErrorMessage name="email"><small style="color:red;">Email is required</small></ErrorMessage>
                        </div>
                        <div class="form-group">
                            <label for="role">Role<span style="color:red;">*</span></label>
                            <Field class="form-control" name="role" :rules="isRequired" v-model="answer.role" />
                            <ErrorMessage name="role"><small style="color:red;">Role is required</small></ErrorMessage>
                        </div>
                        <Button :disabled="!(meta.valid && meta.dirty)" class="p-button-lg" icon="pi pi-angle-double-right" @click="isTerisi = false, ubahSoal1 = true"  />
                </div>

                <div v-else>
                    <Card>
                        <template #content>
                            <div v-if="ubahSoal1">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(0,4)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">1</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <Field name="p1" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p1" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p1"><small style="color:red;">P1 is required</small></ErrorMessage>
                                                <!-- <RadioButton name="p1" :value="question.id" v-model="answer.p1" /> -->
                                            </td>
                                            <td>
                                                <Field name="k1" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k1" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k1"><small style="color:red;">K1 is required</small></ErrorMessage>
                                                <!-- <RadioButton name="k1" :value="question.id" v-model="answer.k1" /> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary p-button-text" disabled />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p1, answer.k1, ubahSoal1, ubahSoal2)" />
                            </div>
                            <div v-else-if="ubahSoal2">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(4,8)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">2</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <Field name="p2" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p2" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p2"><small style="color:red;">P2 is required</small></ErrorMessage>
                                                <!-- <RadioButton name="p2" :value="question.id" v-model="answer.p2" /> -->
                                            </td>
                                            <td>
                                                <Field name="k2" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k2" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k2"><small style="color:red;">K2 is required</small></ErrorMessage>
                                                <!-- <RadioButton name="k2" :value="question.id" v-model="answer.k2"/> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                    <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal2 = false, ubahSoal1 = true" />
                                    <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p2, answer.k2, ubahSoal2, ubahSoal3)"/>
                            </div>

                            <div v-else-if="ubahSoal3">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(8,12)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">3</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p3" :value="question.id" v-model="answer.p3" /> -->
                                                <Field name="p3" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p3" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p3"><small style="color:red;">P3 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k3" :value="question.id" v-model="answer.k3" /> -->
                                                <Field name="k3" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k3" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k3"><small style="color:red;">K3 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal3 = false, ubahSoal2 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right"  :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p3, answer.k3, ubahSoal3, ubahSoal4)" />
                            </div>

                            <div v-else-if="ubahSoal4">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(12,16)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">4</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p4" :value="question.id" v-model="answer.p4" /> -->
                                                <Field name="p4" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p4" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p4"><small style="color:red;">P4 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k4" :value="question.id" v-model="answer.k4" /> -->
                                                <Field name="k4" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k4" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k4"><small style="color:red;">K4 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal4 = false, ubahSoal3 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right"  :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p4, answer.k4, ubahSoal4, ubahSoal5)" />
                            </div>

                            <div v-else-if="ubahSoal5">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(16,20)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">5</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p5" :value="question.id" v-model="answer.p5" /> -->
                                                <Field name="p5" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p5" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p5"><small style="color:red;">P5 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k5" :value="question.id" v-model="answer.k5" /> -->
                                                <Field name="k5" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k5" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k5"><small style="color:red;">k5 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal5 = false, ubahSoal4 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p5, answer.k5, ubahSoal5, ubahSoal6)" />
                            </div>

                            <div v-else-if="ubahSoal6">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(20,24)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">6</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p6" :value="question.id" v-model="answer.p6" /> -->
                                                <Field name="p6" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p6" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p6"><small style="color:red;">p6 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k6" :value="question.id" v-model="answer.k6" /> -->
                                                <Field name="k6" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k6" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k6"><small style="color:red;">k6 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal6 = false, ubahSoal5 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p6, answer.k6, ubahSoal6, ubahSoal7)" />
                            </div>

                            <div v-else-if="ubahSoal7">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(24,28)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">7</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p7" :value="question.id" v-model="answer.p7" /> -->
                                                <Field name="p7" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p7" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p7"><small style="color:red;">p7 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k7" :value="question.id" v-model="answer.k7" /> -->
                                                <Field name="k7" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k7" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k7"><small style="color:red;">k7 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal7 = false, ubahSoal6 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p7, answer.k7, ubahSoal7, ubahSoal8)" />
                            </div>

                            <div v-else-if="ubahSoal8">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(28,32)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">8</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p8" :value="question.id" v-model="answer.p8" /> -->
                                                <Field name="p8" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p8" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p8"><small style="color:red;">p8 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k8" :value="question.id" v-model="answer.k8" /> -->
                                                <Field name="k8" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k8" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k8"><small style="color:red;">k8 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal8 = false, ubahSoal7 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p8, answer.k8, ubahSoal8, ubahSoal9)" />
                            </div>

                            <div v-else-if="ubahSoal9">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(32,36)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">9</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p9" :value="question.id" v-model="answer.p9" /> -->
                                                <Field name="p9" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p9" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p9"><small style="color:red;">p9 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k9" :value="question.id" v-model="answer.k9" /> -->
                                                <Field name="k9" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k9" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k9"><small style="color:red;">k9 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal9 = false, ubahSoal8 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p9, answer.k9, ubahSoal9, ubahSoal10)" />
                            </div>

                            <div v-else-if="ubahSoal10">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(36,40)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">10</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p10" :value="question.id" v-model="answer.p10" /> -->
                                                <Field name="p10" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p10" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p10"><small style="color:red;">p10 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k10" :value="question.id" v-model="answer.k10" /> -->
                                                <Field name="k10" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k10" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k10"><small style="color:red;">k10 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal10 = false, ubahSoal9 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p10, answer.k10, ubahSoal10, ubahSoal11)" />
                            </div>

                            <div v-else-if="ubahSoal11">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(40,44)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">11</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p11" :value="question.id" v-model="answer.p11" /> -->
                                                <Field name="p11" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p11" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p11"><small style="color:red;">p11 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k11" :value="question.id" v-model="answer.k11" /> -->
                                                <Field name="k11" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k11" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k11"><small style="color:red;">k11 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal11 = false, ubahSoal10 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p11, answer.k11, ubahSoal11, ubahSoal12)" />
                            </div>

                            <div v-else-if="ubahSoal12">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(44,48)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">12</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p12" :value="question.id" v-model="answer.p12" /> -->
                                                <Field name="p12" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p12" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p12"><small style="color:red;">p12 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k12" :value="question.id" v-model="answer.k12" /> -->
                                                <Field name="k12" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k12" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k12"><small style="color:red;">k12 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal12 = false, ubahSoal11 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p12, answer.k12, ubahSoal12, ubahSoal13)" />
                            </div>

                            <div v-else-if="ubahSoal13">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(48,52)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">13</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p13" :value="question.id" v-model="answer.p13" /> -->
                                                <Field name="p13" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p13" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p13"><small style="color:red;">p13 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k13" :value="question.id" v-model="answer.k13" /> -->
                                                <Field name="k13" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k13" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k13"><small style="color:red;">k13 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal13 = false, ubahSoal12 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p13, answer.k13, ubahSoal13, ubahSoal14)" />
                            </div>

                            <div v-else-if="ubahSoal14">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(52,56)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">14</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p14" :value="question.id" v-model="answer.p14" /> -->
                                                <Field name="p14" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p14" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p14"><small style="color:red;">p14 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k14" :value="question.id" v-model="answer.k14" /> -->
                                                <Field name="k14" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k14" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k14"><small style="color:red;">k14 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal14 = false, ubahSoal13 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p14, answer.k14, ubahSoal14, ubahSoal15)" />
                            </div>

                            <div v-else-if="ubahSoal15">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(56,60)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">15</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p15" :value="question.id" v-model="answer.p15" /> -->
                                                <Field name="p15" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p15" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p15"><small style="color:red;">p15 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k15" :value="question.id" v-model="answer.k15" /> -->
                                                <Field name="k15" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k15" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k15"><small style="color:red;">k15 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal15 = false, ubahSoal14 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p15, answer.k15, ubahSoal15, ubahSoal16)" />
                            </div>

                            <div v-else-if="ubahSoal16">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(60,64)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">16</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p16" :value="question.id" v-model="answer.p16" /> -->
                                                <Field name="p16" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p16" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p16"><small style="color:red;">p16 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k16" :value="question.id" v-model="answer.k16" /> -->
                                                <Field name="k16" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k16" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k16"><small style="color:red;">k16 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal16 = false, ubahSoal15 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p16, answer.k16, ubahSoal16, ubahSoal17)" />
                            </div>

                            <div v-else-if="ubahSoal17">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(64,68)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">17</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p17" :value="question.id" v-model="answer.p17" /> -->
                                                <Field name="p17" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p17" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p17"><small style="color:red;">p17 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k17" :value="question.id" v-model="answer.k17" /> -->
                                                <Field name="k17" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k17" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k17"><small style="color:red;">k17 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal17 = false, ubahSoal16 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p17, answer.k17, ubahSoal17, ubahSoal18)" />
                            </div>

                            <div v-else-if="ubahSoal18">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(68,72)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">18</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p18" :value="question.id" v-model="answer.p18" /> -->
                                                <Field name="p18" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p18" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p18"><small style="color:red;">p18 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k18" :value="question.id" v-model="answer.k18" /> -->
                                                <Field name="k18" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k18" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k18"><small style="color:red;">k18 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal18 = false, ubahSoal17 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p18, answer.k18, ubahSoal18, ubahSoal19)" />
                            </div>

                            <div v-else-if="ubahSoal19">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(72,76)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">19</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p19" :value="question.id" v-model="answer.p19" /> -->
                                                <Field name="p19" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p19" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p19"><small style="color:red;">p19 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k19" :value="question.id" v-model="answer.k19" /> -->
                                                <Field name="k19" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k19" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k19"><small style="color:red;">k19 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal19 = false, ubahSoal18 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p19, answer.k19, ubahSoal19, ubahSoal20)" />
                            </div>

                            <div v-else-if="ubahSoal20">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(76,80)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">20</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p20" :value="question.id" v-model="answer.p20" /> -->
                                                <Field name="p20" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p20" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p20"><small style="color:red;">p20 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k20" :value="question.id" v-model="answer.k20" /> -->
                                                <Field name="k20" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k20" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k20"><small style="color:red;">k20 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal20 = false, ubahSoal19 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p20, answer.k20, ubahSoal20, ubahSoal21)" />
                            </div>

                            <div v-else-if="ubahSoal21">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(80,84)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">21</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p21" :value="question.id" v-model="answer.p21" /> -->
                                                <Field name="p21" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p21" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p21"><small style="color:red;">p21 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k21" :value="question.id" v-model="answer.k21" /> -->
                                                <Field name="k21" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k21" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k21"><small style="color:red;">k21 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal21 = false, ubahSoal20 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p21, answer.k21, ubahSoal21, ubahSoal22)" />
                            </div>

                            <div v-else-if="ubahSoal22">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(84,88)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">22</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p22" :value="question.id" v-model="answer.p22" /> -->
                                                <Field name="p22" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p22" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p22"><small style="color:red;">p22 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k22" :value="question.id" v-model="answer.k22" /> -->
                                                <Field name="k22" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k22" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k22"><small style="color:red;">k22 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal22 = false, ubahSoal21 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p22, answer.k22, ubahSoal22, ubahSoal23)" />
                            </div>

                            <div v-else-if="ubahSoal23">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Gambaran Diri</th>
                                            <th scope="col">P</th>
                                            <th scope="col">K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(88,92)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">23</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p23" :value="question.id" v-model="answer.p23" /> -->
                                                <Field name="p23" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p23" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p23"><small style="color:red;">p23 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k23" :value="question.id" v-model="answer.k23" /> -->
                                                <Field name="k23" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k23" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k23"><small style="color:red;">k23 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal23 = false, ubahSoal22 = true" />
                                <Button class="p-button-info" icon="pi pi-arrow-right" :disabled="!(meta.valid && meta.dirty)" @click="next(answer.p23, answer.k23, ubahSoal23, ubahSoal24)" />
                            </div>

                            <div v-else-if="ubahSoal24">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Gambaran Diri</th>
                                            <th>P</th>
                                            <th>K</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(question, index) in questions.slice(92,96)" :key="index">
                                        <tr>
                                            <div v-if="index===0">
                                                <td rowspan="4">24</td>
                                            </div>
                                            <div v-else>
                                                <td></td>
                                            </div>
                                            <td>{{ question.question }}</td>
                                            <td>
                                                <!-- <RadioButton name="p24" :value="question.id" v-model="answer.p24" /> -->
                                                <Field name="p24" type="radio" :value="question.id" :rules="isRequired" v-model="answer.p24" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="p24"><small style="color:red;">p24 is required</small></ErrorMessage>
                                            </td>
                                            <td>
                                                <!-- <RadioButton name="k24" :value="question.id" v-model="answer.k24" /> -->
                                                <Field name="k24" type="radio" :value="question.id" :rules="isRequired" v-model="answer.k24" style="width:20px; height: 20px;"/>
                                                <ErrorMessage name="k24"><small style="color:red;">k24 is required</small></ErrorMessage>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button class="p-button-secondary" icon="pi pi-arrow-left" @click="ubahSoal24 = false, ubahSoal23 = true" />
                                <Button class="p-button-info" :disabled="!(meta.valid && meta.dirty)" type="submit" icon="pi pi-check" />
                            </div>
                        </template>
                    </Card>
                </div>
                </Form>
            <!-- </form> -->
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const answer = reactive({
    name: '',
    email: '',
    role: '',
    p1: '', p9: '', p17: '',
    k1: '', k9: '', k17: '',
    p2: '', p10: '', p18: '',
    k2: '', k10: '', k18: '',
    p3: '', p11: '', p19: '',
    k3: '', k11: '', k19: '',
    p4: '', p12: '', p20: '',
    k4: '', k12: '', k20: '',
    p5: '', p13: '', p21: '',
    k5: '', k13: '', k21: '',
    p6: '', p14: '', p22: '',
    k6: '', k14: '', k22: '',
    p7: '', p15: '', p23: '',
    k7: '', k15: '', k23: '',
    p8: '', p16: '', p24: '',
    k8: '', k16: '', k24: ''
})
let isTerisi = ref(true);
let ubahSoal1 = ref(false);     let ubahSoal2 = ref(false);     let ubahSoal3 = ref(false);
let ubahSoal4 = ref(false);     let ubahSoal5 = ref(false);     let ubahSoal6 = ref(false);
let ubahSoal7 = ref(false);     let ubahSoal8 = ref(false);     let ubahSoal9 = ref(false);
let ubahSoal10 = ref(false);    let ubahSoal11 = ref(false);    let ubahSoal12 = ref(false);
let ubahSoal13 = ref(false);    let ubahSoal14 = ref(false);    let ubahSoal15 = ref(false);
let ubahSoal16 = ref(false);    let ubahSoal17 = ref(false);    let ubahSoal18 = ref(false);
let ubahSoal19 = ref(false);    let ubahSoal20 = ref(false);    let ubahSoal21 = ref(false);
let ubahSoal22 = ref(false);    let ubahSoal23 = ref(false);    let ubahSoal24 = ref(false);
const questions = ref();

onMounted(() => {
    getQuestion()
})

function getQuestion() {
     try {
        axios.get("http://localhost:3000/api/1.0/questions")
        .then(response => {
            questions.value = response.data.data
        });
    } catch (err) {
        console.log(err);
    }
}

async function save() {
    try {
        if(answer.p24 ===answer.k24) {
            toast.add({ severity: "error", summary: "You cannot select both of `P` and `K` choice in the same term"});
            return;
        } else {
            await axios.post("http://localhost:3000/api/1.0/answers", {
            name: answer.name,
            email: answer.email,
            role: answer.role,
            p1: answer.p1, p7: answer.p7, p13: answer.p13, p19: answer.p19,
            k1: answer.k1, k7: answer.k7, k13: answer.k13, k19: answer.k19,
            p2: answer.p2, p8: answer.p8, p14: answer.p14, p20: answer.p20,
            k2: answer.k2, k8: answer.k8, k14: answer.k14, k20: answer.k20,
            p3: answer.p3, p9: answer.p9, p15: answer.p15, p21: answer.p21,
            k3: answer.k3, k9: answer.k9, k15: answer.k15, k21: answer.k21,
            p4: answer.p4, p10: answer.p10, p16: answer.p16, p22: answer.p22,
            k4: answer.k4, k10: answer.k10, k16: answer.k16, k22: answer.k22,
            p5: answer.p5, p11: answer.p11, p17: answer.p17, p23: answer.p23,
            k5: answer.k5, k11: answer.k11, k17: answer.k17, k23: answer.k23,
            p6: answer.p6, p12: answer.p12, p18: answer.p18, p24: answer.p24,
            k6: answer.k6, k12: answer.k12, k18: answer.k18, k24: answer.k24,
        }).then(() => {
            toast.add({ severity: "info", summary: "Your answer has been saved" });
            setTimeout(function(){
                location.reload();
            }, 1000);
        })
        }
        
    } catch (err) {
        console.log(err);
    }
}

const isRequired = (value) => {
    if (!value) {
        return 'This field is required';
    }
    return true;
}
const next = (p, k, prevQuestion, nextQuestion) => {
    if(p === k) {
        toast.add({ severity: "error", summary: "You cannot select both of `P` and `K` choice in the same term"});
        return;
    }
    prevQuestion = false;
    nextQuestion = true;
    if(ubahSoal1.value) {
        ubahSoal1.value = prevQuestion;
        ubahSoal2.value = nextQuestion;
    } else if(ubahSoal2.value){
        ubahSoal2.value = prevQuestion;
        ubahSoal3.value = nextQuestion;
    } else if(ubahSoal3.value){
        ubahSoal3.value = prevQuestion;
        ubahSoal4.value = nextQuestion;
    } else if(ubahSoal4.value){
        ubahSoal4.value = prevQuestion;
        ubahSoal5.value = nextQuestion;
    } else if(ubahSoal5.value){
        ubahSoal5.value = prevQuestion;
        ubahSoal6.value = nextQuestion;
    } else if(ubahSoal6.value){
        ubahSoal6.value = prevQuestion;
        ubahSoal7.value = nextQuestion;
    } else if(ubahSoal7.value){
        ubahSoal7.value = prevQuestion;
        ubahSoal8.value = nextQuestion;
    } else if(ubahSoal8.value){
        ubahSoal8.value = prevQuestion;
        ubahSoal9.value = nextQuestion;
    } else if(ubahSoal9.value){
        ubahSoal9.value = prevQuestion;
        ubahSoal10.value = nextQuestion;
    } else if(ubahSoal10.value){
        ubahSoal10.value = prevQuestion;
        ubahSoal11.value = nextQuestion;
    } else if(ubahSoal11.value){
        ubahSoal11.value = prevQuestion;
        ubahSoal12.value = nextQuestion;
    } else if(ubahSoal12.value){
        ubahSoal12.value = prevQuestion;
        ubahSoal13.value = nextQuestion;
    } else if(ubahSoal13.value){
        ubahSoal13.value = prevQuestion;
        ubahSoal14.value = nextQuestion;
    } else if(ubahSoal14.value){
        ubahSoal14.value = prevQuestion;
        ubahSoal15.value = nextQuestion;
    } else if(ubahSoal15.value){
        ubahSoal15.value = prevQuestion;
        ubahSoal16.value = nextQuestion;
    }else if(ubahSoal16.value){
        ubahSoal16.value = prevQuestion;
        ubahSoal17.value = nextQuestion;
    } else if(ubahSoal17.value){
        ubahSoal17.value = prevQuestion;
        ubahSoal18.value = nextQuestion;
    } else if(ubahSoal18.value){
        ubahSoal18.value = prevQuestion;
        ubahSoal19.value = nextQuestion;
    } else if(ubahSoal19.value){
        ubahSoal19.value = prevQuestion;
        ubahSoal20.value = nextQuestion;
    } else if(ubahSoal20.value){
        ubahSoal20.value = prevQuestion;
        ubahSoal21.value = nextQuestion;
    }else if(ubahSoal21.value){
        ubahSoal21.value = prevQuestion;
        ubahSoal22.value = nextQuestion;
    }else if(ubahSoal22.value){
        ubahSoal22.value = prevQuestion;
        ubahSoal23.value = nextQuestion;
    } else if(ubahSoal23.value){
        ubahSoal23.value = prevQuestion;
        ubahSoal24.value = nextQuestion;
    }
    }
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css";

.form-group{
    width:800px;
    margin-top:15px;
    margin-left: 50px;
    margin-right: 50px;
}
.form-group .col-md-4{
    width:800px;
    margin-top:10px;
    justify-content: center;
    justify-items: center;
}
h3 {
    margin-top:20px;
}
.box {
    margin: 0 auto;
    display: grid;
    justify-content: center;
}

.box .col-md {
    margin: 0 auto;
    display: grid;
    justify-content: center;
}

.p-card {
    width: 800px;
}

p {
    font-size: x-large;
    margin-top: 0px;
}
.p-button-info {
    margin-left: 680px;
}
.p-button-lg{
    margin-left: 820px;
    margin-bottom:20px;
}
</style>