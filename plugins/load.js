---
---
{% for plugin in site.pb-plugins %}
Plugin.LoadPlugin({{plugin}});
{% endfor %}
