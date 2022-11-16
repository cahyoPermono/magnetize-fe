<template>
    <p>Click jika tidak melakukan download</p>
    <Button label="coba download" @click="downloadPDF" />
</template>

<script setup>
import axios from 'axios';
const route = useRoute();
const params = route.params.id;

const config = useRuntimeConfig();

async function downloadPDF() {
    const data = await axios.get(config.API_BASE_URL + "download_pdf/" + params);
    const pdfb64 = data.data.dataPDF;
    const linkSource = `data:application/pdf;base64,${pdfb64}`;
    const downloadLink = document.createElement("a");
    const fileName = `dataPelamar_${params}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

onMounted(() => {
    downloadPDF();
});
</script>