import { ref, computed, onMounted } from 'vue';

function filterResults(results, filters) {
  return results.value.filter((part) => filters.value.every(
    (filter) => {
      const filterField = Object.keys(filter)[0];
      const filterValue = filter[filterField];
      return part[filterField] === filterValue;
    },
  ));
}

export default function useFilters(searchResults) {
  const filters = ref([]);

  const applyFilters = (filter) => {
    const filterSelected = filters.value.find((f) => f.type === filter.type);
    if (!filterSelected) {
      filters.value.push(filter);
    }
  };

  const clearFilters = () => { filters.value = []; };

  onMounted(() => console.log('Mounted: useFilters'));

  const filteredResults = computed(() => filterResults(searchResults, filters));

  return {
    filters,
    applyFilters,
    clearFilters,
    filteredResults,
  };
}
