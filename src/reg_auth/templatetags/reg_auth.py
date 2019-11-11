from django import template

register = template.Library()

@register.inclusion_tag('reg_auth.html')
def reg_auth():
    print('xxxx')
    return {}