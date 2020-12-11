from django import template
from django.utils.safestring import mark_safe
import re

register = template.Library()

def case_agnostic_re(word):
    r = ""
    for letter in word:
        r += "({}|{})".format(letter.upper(),letter.lower())
    return r


@register.filter
def strongterms(value, terms, start_strong="<strong>", end_strong="</strong>"):
    '''
    Adds the strong tag to all instances of all listed terms in the filtered text
    '''

    if not terms:
        return mark_safe(value)

    term_re = re.compile("({})".format("|".join(map(case_agnostic_re, terms))))
        
    r = ""
    i = 0 # ind of end of last match
    for match in term_re.finditer(value):
        r += value[i:match.start()]
        r += start_strong
        r += match.group()
        r += end_strong
        i = match.end()

    r += value[i:]

    return mark_safe(r)




