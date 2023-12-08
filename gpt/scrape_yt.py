from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
import re


def extract_video_id(url):
    pattern = r"(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&\/]+)"
    match = re.search(pattern, url)
    if match:
        return match.group(1)
    else:
        return None


def get_transcript(url: str):
    id = extract_video_id(url) or url
    transcript = YouTubeTranscriptApi.get_transcript(id)

    formatter = TextFormatter()
    text = formatter.format_transcript(transcript)
    text = text.replace('\n', ' ')
    return text