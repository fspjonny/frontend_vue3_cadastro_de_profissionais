<script setup>

const props = defineProps({
    sendAlertColor: String,
    sendAlertTitle: String,
    sendAlertMsg: String,
})

</script>

<template>
    <dialog id="person_modal" class="bg-black bg-opacity-80 modal modal-bottom sm:modal-middle">
    <div class="modal-box" :class="props.sendAlertColor">
        <h3 class="font-bold text-lg">{{ props.sendAlertTitle }}</h3>
        <p class="py-4">{{ props.sendAlertMsg }}</p>

        <div class="modal-action">
            <button class="btn btn-xs" onclick="person_modal.close()">Fechar</button>
        </div>
    </div>
    </dialog>
</template>
