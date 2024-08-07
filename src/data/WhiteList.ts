const UrlWhiteList: RegExp[] = [

]

const SdkWhiteList: RegExp[] = [
    new RegExp("com.facebook*"),
    new RegExp("okhttp3.*"),
]

export default {
    UrlWhiteList: UrlWhiteList,
    SdkWhiteList: SdkWhiteList,
}

