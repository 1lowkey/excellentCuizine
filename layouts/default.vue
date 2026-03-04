<template>
    <div class="site-layout">
        <TheNavbar />
        <slot />
        <TheFooter />
    </div>
</template>

<style scoped>
.site-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
