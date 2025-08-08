import glob
import os
from bs4 import BeautifulSoup
import pytest

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
HTML_FILES = glob.glob(os.path.join(BASE_DIR, "*.html"))

REQUIRED_LINKS = {
    "index.html",
    "menu.html",
    "order.html",
    "catering.html",
    "about.html",
    "gallery.html",
    "reviews.html",
    "contact.html",
    "faq.html",
}

@pytest.mark.parametrize("html_file", HTML_FILES)
def test_navigation_links_and_active(html_file):
    with open(html_file, encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    nav = soup.find("nav")
    assert nav is not None, f"{html_file} is missing a <nav> element"

    links = {a.get("href") for a in nav.find_all("a", href=True)}
    assert links == REQUIRED_LINKS, f"Unexpected links in {html_file}: {links}" 

    active_links = [a for a in nav.find_all("a", href=True) if "active" in a.get("class", [])]
    assert len(active_links) == 1, f"{html_file} should have exactly one active link"

    active_href = active_links[0]["href"]
    expected_href = os.path.basename(html_file)
    assert active_href == expected_href, (
        f"Active link in {html_file} should be {expected_href}, got {active_href}"
    )
