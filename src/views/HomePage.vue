<script setup>
	import { ref, computed } from "vue";
	import SidebarLayout from "@/layouts/SidebarLayout.vue";
	import CafeCard from "@/components/CafeCard.vue";
	import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
	import BaseContainer from "@/components/base/BaseContainer.vue";
	import BaseForm from "@/components/base/BaseForm.vue";
	import BaseInput from "@/components/base/BaseInput.vue";
	import { useFirestore } from "vuefire";
	import {
		collection,
		query,
		where,
		getDocs,
		onSnapshot,
	} from "firebase/firestore";

	const db = useFirestore();

	const q = query(collection(db, "cafes"), where("isActive", "==", true));
	const cafeCollection = ref([]);
	const querySnapshot = await getDocs(q);

	onSnapshot(q, () => {
		cafeCollection.value = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(`ID: ${doc.id}`, " => ", doc.data());
			cafeCollection.value.push(doc.data());
		});
	});

	const filterParams = ref({
		text: "",
		favorite: false,
	});

	const filteredCafes = computed(() => {
		return cafeCollection.value.filter((cafe) => {
			return (
				cafe.name
					.toLowerCase()
					.includes(filterParams.value.text.toLowerCase()) &&
				(filterParams.value.favorite ? cafe.favorite : true)
			);
		});
	});
</script>

<template>
	<SidebarLayout>
		<template v-slot:sidebar>
			<BaseContainer>
				<h2 class="mb-4">Filter</h2>
				<BaseForm>
					<BaseInput v-model="filterParams.text" label="Name" />
					<BaseCheckbox
						v-model="filterParams.favorite"
						label="Favorited" />
				</BaseForm>
			</BaseContainer>
		</template>

		<template v-slot:main>
			<BaseContainer>
				<h2 class="mb-4">Content</h2>
				<CafeCard
					v-for="cafe in filteredCafes"
					v-bind="cafe"
					:docId="cafe.id"
					:key="cafe.id" />
			</BaseContainer>
		</template>
	</SidebarLayout>
</template>

<style></style>
