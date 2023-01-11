import type { Ref } from 'vue'
import type { NuxtJob } from '../types'
import { toRelativeDate } from '../utils'

export const useNuxtJobs = () => {
  const route = useRoute()
  const jobs: Ref<NuxtJob[] | []> = useState('jobs', () => [])

  const mapRemote = (remoteType: string) => {
    switch (remoteType) {
      case 'ONLY':
        return 'Remote Only'
      case 'ALLOWED':
        return 'Remote Allowed'
      default:
        return 'Onsite'
    }
  }
  // Data fetching

  async function fetchList () {
    const { data, error } = await useFetch<NuxtJob[]>('/api/jobs.json')

    /* Missing data is handled at component level */
    if (!data.value && error.value) {
      return error.value
    }

    jobs.value = data.value
      ? data.value.map((job) => {
        return { ...job, remote: mapRemote(job.remote), published_at: toRelativeDate(job.published_at) }
      })
      : []
  }

  // Computed

  const filteredJobs = computed(() => {
    return [...jobs.value]
      .filter((job) => {
        if (selectedLocation.value && !job.locations.includes(selectedLocation.value.key)) {
          return false
        }
        if (selectedType.value && job.remote !== selectedType.value.key) {
          return false
        }
        return true
      })
  })

  const locations = computed(() => {
    const locations = jobs.value?.map(job => job.locations).flat() || []
    return [...new Set(locations)]
      .map(l => ({ key: l, label: l }))
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  const types = computed(() => {
    const types = jobs.value?.map(job => job.remote)
    return [...new Set(types)]
      .map((t) => {
        return { key: t, label: t }
      })
  })

  const selectedLocation = computed(() => {
    return locations.value.find(location => location.key === route.query.location)
  })

  const selectedType = computed(() => {
    return types.value.find(type => type.key === route.query.type)
  })

  return {
    fetchList,
    filteredJobs,
    locations,
    types,
    selectedLocation,
    selectedType
  }
}
