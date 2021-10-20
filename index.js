const {React, getModule} = require('powercord/webpack')
const { Plugin } = require("powercord/entities");
const {inject, uninject} = require('powercord/injector')
const MessageContextMenu = getModule(m => m.default && m.default.displayName === "MessageContextMenu", false)
class bruhHehe extends Plugin {
    async startPlugin() {
        const {
            MenuItem
        } = await getModule(["MenuGroup", "MenuCheckboxItem"]);
        inject("Hide-Message", MessageContextMenu, "default", (args, res) => {
            if (!args[0]?.message || !res?.props?.children) return res;
            res.props.children.splice(
                4,
                0,
                React.createElement(MenuItem, {
                    label: "Hide Message",
                    action: () => document.querySelector(`#chat-messages-${args[0].message.id}`).style.display = "none"
                })
            )
            return res
        })
        MessageContextMenu.default.displayName = "MessageContextMenu";
    }

    pluginWillUnload() {
        uninject("Hide-Message")
    }
}

module.exports = bruhHehe