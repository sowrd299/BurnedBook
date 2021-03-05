'''
Utility functions
'''

def search(objects, terms, field, order_field, bad_terms):
    for term in terms:
        new_objects = objects.filter(**{field+"__icontains":term}).order_by(order_field)
        if new_objects.count():
            objects = new_objects
        else:
            # through out terms that restrict the search to no terms
            # favors earlier terms
            bad_terms.append(term)
    return objects


def filter_checked(model, get, objects, field):
    selected = model.objects.filter(name__in = (i for i in get if get[i]=='True'))
    if selected:
        return objects.filter(**{field + "__in":selected})

    return objects