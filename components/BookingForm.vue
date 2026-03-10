<template>
  <div class="booking-container glass-morphism">
    <div v-if="!isSubmitted" class="form-wrapper">
      <div class="form-header">
        <h2>Perfect for any Moment</h2>
        <p>Book an order, schedule a consultancy, or plan an event with us.</p>
        <div class="title-underline"></div>
      </div>

      <form @submit.prevent="handleSubmit" class="booking-form">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input v-model="formData.name" id="name" type="text" placeholder="John Doe" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input v-model="formData.email" id="email" type="email" placeholder="john@example.com" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input v-model="formData.phone" id="phone" type="tel" placeholder="+233..." required>
          </div>
        </div>

        <div class="form-group">
          <label for="type">What are you booking?</label>
          <select v-model="formData.bookingType" id="type">
            <option value="Order">General Order</option>
            <option value="Consultancy">Diet Consultancy</option>
            <option value="Event">Event Catering </option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">Special Requests</label>
          <textarea v-model="formData.message" id="message" rows="4"
            placeholder="Tell us more about your order or food choice for your event..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary form-submit">
          Send Booking Request
        </button>
      </form>
    </div>

    <div v-else class="success-message fade-in">
      <div class="success-icon">✓</div>
      <h2>Thank You, {{ formData.name }}!</h2>
      <p>We've received your booking for <strong>{{ formData.bookingType }}</strong>. Our team will contact you shortly
        via {{ formData.email }} to confirm details.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  bookingType: 'Order',
  message: ''
})

const isSubmitted = ref(false)

const handleSubmit = async () => {
  try {
    // 1. Send to Backend (Keep for records)
    await $fetch('/api/bookings', {
      method: 'POST',
      body: formData.value
    })

    // 2. Prepare WhatsApp Message
    const whatsappNumber = '233501524186'
    const message = `*New Booking Request - Excellent Cuizine*%0A%0A` +
      `*Name:* ${formData.value.name}%0A` +
      `*Email:* ${formData.value.email}%0A` +
      `*Phone:* ${formData.value.phone}%0A` +
      `*Type:* ${formData.value.bookingType}%0A` +
      `*Message:* ${formData.value.message}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    // 3. Trigger Submission State
    isSubmitted.value = true

    // 4. Redirect to WhatsApp
    window.open(whatsappUrl, '_blank')

    // Reset form after 5 seconds
    setTimeout(() => {
      isSubmitted.value = false
      formData.value = {
        name: '',
        email: '',
        phone: '',
        bookingType: 'Order',
        message: ''
      }
    }, 5000)
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to send booking request. Please try again.')
  }
}
</script>

<style scoped>
.booking-container {
  padding: 3rem;
  border-radius: var(--radius);
  max-width: 800px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.form-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--text-light);
}

.form-header .title-underline {
  margin: 0.5rem auto 0;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--secondary);
}

input,
select,
textarea {
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: var(--white);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.form-submit {
  margin-top: 1rem;
  justify-content: center;
  font-size: 1.1rem;
  padding: 1rem;
}

.success-message {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: var(--primary);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
