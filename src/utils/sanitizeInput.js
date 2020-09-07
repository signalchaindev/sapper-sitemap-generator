import createDOMPurify from 'dompurify'

export function sanitizeInput(data) {
  if (!data) {
    throw new Error("sanitizeInput requires 'data' as an argument")
  }

  if (data.constructor === Array) {
    // [] has been tested
    return data.forEach(datum => {
      sanitizer(datum)
    })
  } else if (data.constructor === Object) {
    // [x] has been tested
    const sanitizedData = {}

    for (const [key, value] of Object.entries(data)) {
      sanitizedData[key] = sanitizer(value)
    }

    return sanitizedData
  } else if (data.constructor === String) {
    // [x] has been tested
    const cleanStr = sanitizer(data)
    return cleanStr
  } else {
    // [] has been tested
    console.error(`No type found for ${data.constructor}`)
  }
}

function sanitizer(input) {
  const options = {
    FORBID_ATTR: ['style'],
    FORBID_TAGS: ['style'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: false,
  }

  if (typeof window !== 'undefined') {
    const DOMPurify = createDOMPurify(window)
    const sanitize = DOMPurify.sanitize(input, options)
    return sanitize
  }
}
