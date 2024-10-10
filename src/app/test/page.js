'use client'

export default function Test(){

    return(
        <div>
            <button onClick={() => document.documentElement.requestFullscreen}>
                Full Screen
            </button>
            <span tabindex={0}>Test 1</span>
            <button aria-hidden="true">Test 2</button>
        </div>
    )
}