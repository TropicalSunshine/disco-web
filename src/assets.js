const AUDIO = [
    "test.mp3",
    "test1.mp3"
];

const audio_files = {};

const downloadAudioFiles = Promise.all(AUDIO.map(downloadAudio));

function downloadAudio(assetName) {
    
    return new Promise(resolve => {
        const asset = new Audio(`/audio/${assetName}`);

        
        asset.addEventListener("canplay", () => {
            
            audio_files[assetName] = asset;
            resolve();
        });
        
        
    });
}


export const getAudio = assetName => audio_files[assetName];


const Images = [
];

const image_files = {};

const downloadImageFiles = Promise.all(AUDIO.map(downloadImage));

function downloadImage(assetName) {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
            
            image_files[assetName] = asset;
            resolve();
        };
        asset.src = `/images/${assetName}`;
    });
};


export const downloadAssets = async () => {
    await downloadAudioFiles;
    await downloadImageFiles;
};