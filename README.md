# Stefan Music App
# IN DEVELOPMENT - NOT RELEASED

Welcome to Stefan Music App. This project is an electron app with an UI that draws inspiration from the  user interface of Mercedes-Benz NTG 4/4.5 systems, present in the C-Class (W204), E-Class (W212), S-Class (W221), CLS-Class (C219), GLK-Class (X204), SLK-Class (R172), E-Class Coupe and Convertible (C207/A207).

The UI is only going to be available in the night mode as of now, maybe in the future I'll add day mode support (horrible way to describe light/dark themes but we're just gonna go with the translations found in the original cars). The particular reason is that I think the night mode is the one that looks the most modern, the day mode looks dated with that yellow + beige mixture.

Since we are not limited by a measly screen that either is stationary, a bigger one that pops out or is fixed, I will make this app support more features and take advantage of the horizontal space that the newer cars do utilise more.

## Features

#### Music/Video Player Support 
The app will feature recreated versions of the music and video player found in the original cars

#### Download Songs from YouTube and Spotify
You will be able to seamlessly download songs from YouTube and Spotify.

#### Virtual Storage and Portability
Just like in the real car, where there is a HDD present, we will have a virtual file system where the app can store songs. The app will also have a way to take your songs from 1 pc to another, it would be based on .json files. These .json files could range from a few hundred MB up to however big your library is.

The music player will also feature a function to take out your songs from this special .json file and convert them to regular files that you can use on your desktop

#### Advanced Sound Playback
The player will feature settings such as rear/front and left/right balance for your audio, bass and trebble adjustment, presets and if you are a user of apps such as KDE Connect, you can control the playback of the songs from your phone.

## Development
The development of such a powerful application will take months, if not a full year. The features I am promising are very great and I am just 1 person. I do not seek the help of other people, all I wish from potential readers and interested users is to wait. 

I also want to consider a different name for this, probably something related to Mercedes-Benz in some way because the whole UI is based on Mercedes-Benz cars.

I plan to release this app on Windows and Linux. If it works on both platforms without any change in the code for each platform, then I'll compile it for MacOS as well.

## Getting Started

You can download a copy of this app for download a release of it 

### Starting Development

```bash
npm/bun start
```

### Packaging for Production

```bash
npm/bun run package
```

**Guiding Principles**:
- **File Path Optimization**: Optimize CSS imports by prefixing file paths within `node_modules` with `~`.
- **Embrace Efficiency**: Use `bun` to make everything faster