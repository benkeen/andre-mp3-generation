# andre-mp3-generation

Project for a composer I know. This tool programmatically merges all possible combinations of a group of mp3 files
where N = number of mp3s and where M is the group size and M > 1 and M < N-1. So if there are 8 mp3, it generates all
combinations of 2 tracks, 3 tracks - up to 7 tracks.

For a group size of 6, this comes out to 56 combinations.

Uses `sox` under the hood for the mp3 file manipulation.