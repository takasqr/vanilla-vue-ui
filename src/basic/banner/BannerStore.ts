import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const BannerStore = defineStore('banner', () => {

  // リアクティブにするために ref を使用する
  const _isOpen = ref(false)
  const _title = ref('')
  const _contentText = ref('')
  const _okButtonText = ref('')

  let _completion: ((isConfirmed: boolean | null) => void) | null = null
  // true にするとダイアログ以外の場所をタップしても消えない
  // ボタンでしか閉じれなくなる
  const _persistent = ref(false)

  // computed にすることで直接変更できなくする
  const isOpen = computed(() => _isOpen)
  const getTitle = computed(() => _title)
  const getContentText = computed(() => _contentText)
  const getOkButtonText = computed(() => _okButtonText)
  const getPersistent = computed(() => _persistent)

  function open({ title, contentText, okButtonText = 'OK', persistent = false, completion = null }: { title: string; contentText: string; okButtonText?: string; persistent?: boolean; completion?: ((isConfirmed: boolean | null) => void) | null }) {

    _title.value = title
    _contentText.value = contentText
    _okButtonText.value = okButtonText
    _persistent.value = persistent
    _isOpen.value = true
    _completion = completion
  }

  function close({ isConfirmed = null }: { isConfirmed?: boolean | null }) {
 
    _isOpen.value = false
    _title.value = ''
    _contentText.value = ''
    _okButtonText.value = ''
    _persistent.value = false

    // コールバック関数が含まれていれば実行
    if (_completion) {

      // 実行
      _completion(isConfirmed)

      // リセット
      _completion = null
    }
  }

  return { isOpen, getPersistent, getTitle, getContentText, getOkButtonText, open, close }
})
