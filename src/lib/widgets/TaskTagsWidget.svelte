<script lang="ts">
    export let streak:number
    export let frequencyLabel:string
    export let deadlineLabel:string
</script>

<div class="outTaskTagsWidget">
    <div class={`tagBox ${streak?"colored":""}`}>{streak}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
          </svg>
    </div>
    <div class="tagBox">{deadlineLabel}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
    </div>
    <div class="tagBox">{frequencyLabel}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
          </svg>
    </div>
</div>

<style>
    .outTaskTagsWidget {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        position: absolute;
        top: -27.5px;
        right: 0;
        padding: 5px;
        border-radius: 5px;
    }

    .tagBox {
        font-size: 12.5px;
        background-color: var(--light1);
        padding: 1.25px 2.5px;
        border-radius: 2.5px;
        color:var(--dark3);
        width: fit-content;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2.5px;        
    }

    .tagBox.colored {
        color:var(--primary0);
        background-color: var(--primary5);
    }

    .tagBox.colored svg {
        fill: var(--primary0);
    }

    .tagBox svg{
        width: 12.5px;
        height: 12.5px;
        box-sizing: content-box;
        fill: var(--dark3);
    }
</style>