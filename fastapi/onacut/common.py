basic_data_type = str | int | float | bool | None


def model_to_json(data: object) -> object:
    """
    This is a dirty hack for now !
    since we're dealing with models, when returning results we should
    serialize those datas

    So let's play with this recursion function that will cook everything
    for us
    """

    if not isinstance(data, (basic_data_type | dict | list)):
        try:
            del data._sa_instance_state  # type: ignore
        except AttributeError:
            pass
        return data.__dict__

    if isinstance(data, dict):
        return {str(key): model_to_json(value) for key, value in data.items()}

    if isinstance(data, list):
        return [model_to_json(value) for value in data]

    return data
